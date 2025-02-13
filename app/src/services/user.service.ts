import { Injectable, NotFoundException } from '@nestjs/common';

import type { User } from '@prisma/client';

import { MESSAGES } from '@/constants/messages';
import { UserRepository } from '@/repositories/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    /**
     * Получает пользователя по Telegram ID
     * @param {number} telegramId - ID пользователя в Telegram
     * @returns {Promise<User>} - Найденный пользователь
     * @throws {NotFoundException} - Если пользователь не найден
     */
    public async getUserByTelegramId(telegramId: number): Promise<User> {
        const user = await this.userRepository.getUserByTelegramId(telegramId);
        if (!user) {
            throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
        }

        return user;
    }

    /**
     * Получает пользователя по ID
     * @param {number} id - ID пользователя
     * @returns {Promise<User>} - Найденный пользователь
     * @throws {NotFoundException} - Если пользователь не найден
     */
    public async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
        }

        return user;
    }
}
