import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from '@/services/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    /**
     * Получает пользователя по Telegram ID.
     * @param {number} telegramId - ID пользователя в Telegram
     * @returns {Promise<User | null>} - Найденный пользователь или `null`, если пользователь не существует
     */
    public getUserByTelegramId(telegramId: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { telegramId } });
    }
}