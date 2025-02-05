import { Injectable } from '@nestjs/common';
import type { Session } from '@prisma/client';
import type { ICreateSession, IUpdateSession } from '@/interfaces/session.interfaces';
import { PrismaService } from '@/services/prisma.service';

@Injectable()
export class SessionRepository {
    constructor(private readonly prisma: PrismaService) {}

    /**
     * Получает все активные сессии пользователя.
     * @param {number} userId - ID пользователя
     * @returns {Promise<Session[]>} - Массив сессий пользователя
     */
    public getSessionsByUserId(userId: number): Promise<Session[]> {
        return this.prisma.session.findMany({ where: { userId }, orderBy: { createdAt: 'asc' } });
    }

    /**
     * Обновляет информацию о сессии.
     * @param {string} sessionId - ID сессии
     * @param {IUpdateSession} data - Данные для обновления сессии
     * @returns {Promise<Session>} - Обновленная сессия
     */
    public updateSession(sessionId: string, data: IUpdateSession): Promise<Session> {
        return this.prisma.session.update({ where: { id: sessionId }, data });
    }

    /**
     * Создаёт новую сессию для пользователя.
     * @param {ICreateSession} data - Данные для создания сессии
     * @returns {Promise<Session>} - Созданная сессия
     */
    public createSession(data: ICreateSession): Promise<Session> {
        return this.prisma.session.create({ data });
    }

    /**
     * Удаляет сессию по refresh-токену и ID пользователя.
     * @param {string} refreshToken - Refresh-токен сессии
     * @param {number} userId - ID пользователя
     * @returns {Promise<number>} - Количество удалённых сессий
     */
    public async deleteSessionByTokenAndUserId(refreshToken: string, userId: number): Promise<number> {
        const result = await this.prisma.session.deleteMany({ where: { refreshToken, userId } });
        return result.count;
    }

    /**
     * Удаляет все сессии пользователя.
     * @param {number} userId - ID пользователя
     * @returns {Promise<number>} - Количество удалённых сессий
     */
    public async deleteSessionsByUserId(userId: number): Promise<number> {
        const result = await this.prisma.session.deleteMany({ where: { userId } });
        return result.count;
    }
}