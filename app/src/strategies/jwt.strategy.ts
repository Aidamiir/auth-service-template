import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { ITokenPayload } from '@/interfaces/token.interfaces';

import { ENV } from '@/constants/env';
import { UserService } from '@/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(ENV.JWT_SECRET)!,
        });
    }

    /**
     * Валидация payload токена
     * @param {ITokenPayload} payload - Декодированная информация из JWT
     * @returns {{ userId: number, telegramId: number }} - Данные пользователя
     */
    public async validate(payload: ITokenPayload): Promise<ITokenPayload> {
        const user = await this.userService.getUserById(payload.userId);
        return { userId: user.id };
    }
}
