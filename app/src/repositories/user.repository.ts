import { Injectable } from '@nestjs/common';

import type { ICreateUser } from '@/interfaces/user.interfaces';
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

    /**
     * Получает пользователя по ID.
     * @param {number} id - ID пользователя
     * @returns {Promise<User | null>} - Найденный пользователь или `null`, если пользователь не существует
     */
    public getUserById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    /**
     * Создает пользователя.
     * @param {ICreateUser} data - ID пользователя
     * @returns {Promise<User>} - Созданный пользователь
     */
    public createUser(data: ICreateUser): Promise<User> {
        return this.prisma.user.create({ data });
    }
}
