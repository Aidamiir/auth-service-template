import * as crypto from 'crypto';

import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { ITelegramInitData, ITelegramUser } from '@/interfaces/telegram.interfaces';

import { ENV } from '@/constants/env';
import { MESSAGES } from '@/constants/messages';

@Injectable()
export class TelegramService {
    private readonly botToken: string;

    constructor(private readonly configService: ConfigService) {
        this.botToken = configService.get<string>(ENV.TELEGRAM_BOT_TOKEN)!;
    }

    /**
     * Проверяет хеш `initData`, чтобы убедиться в его подлинности и отсутствии изменений.
     * @param {string} initData - Данные, полученные от Telegram WebApp
     * @returns {boolean} - `true`, если данные валидны, иначе `false`
     */
    public verifyInitData(initData: string): boolean {
        const params = new URLSearchParams(initData);
        const hash = params.get('hash');
        if (!hash) return false;
        params.delete('hash');

        const sortedParams = Array.from(params.entries())
            .map(([key, value]) => `${key}=${value}`)
            .sort()
            .join('\n');

        const secretKey = crypto.createHash('sha256').update(this.botToken).digest();

        const calculatedHash = crypto
            .createHmac('sha256', secretKey)
            .update(sortedParams)
            .digest('hex');

        return calculatedHash === hash;
    }

    /**
     * Извлекает данные из `initData`, проверяя их подлинность.
     * @param {string} initData - Данные, полученные от Telegram WebApp
     * @returns {{ user: ITelegramUser, authDate: string, queryId: string }} - Объект с извлечёнными данными
     * @throws {BadRequestException} - Если данные некорректны или не прошли проверку
     */
    public extractInitData(initData: string): ITelegramInitData {
        const isValid = this.verifyInitData(initData);
        if (!isValid) {
            throw new BadRequestException(MESSAGES.AUTH.LOGIN.TELEGRAM_VALIDATE_DATA_ERROR);
        }

        const params = new URLSearchParams(initData);

        const userRaw = params.get('user');
        const authDate = params.get('auth_date');
        const queryId = params.get('query_id');

        const user = userRaw ? (JSON.parse(userRaw) as ITelegramUser) : null;
        if (!user || !authDate || !queryId) {
            throw new BadRequestException(MESSAGES.AUTH.LOGIN.TELEGRAM_VALIDATE_DATA_ERROR);
        }

        return { user, authDate, queryId };
    }
}
