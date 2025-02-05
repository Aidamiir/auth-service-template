import { Injectable } from '@nestjs/common';

import type { ICreateSession, IUpdateSession } from '@/interfaces/session.interfaces';
import type { Session } from '@prisma/client';

import { SessionRepository } from '@/repositories/session.repository';

@Injectable()
export class SessionService {
    constructor(private readonly sessionRepository: SessionRepository) {}

    /**
     * Получает все активные сессии пользователя.
     * @param {number} userId - ID пользователя
     * @returns {Promise<Session[]>} - Массив сессий пользователя
     */
    public getSessionsByUserId(userId: number): Promise<Session[]> {
        return this.sessionRepository.getSessionsByUserId(userId);
    }

    /**
     * Обновляет информацию о сессии.
     * @param {string} sessionId - ID сессии
     * @param {IUpdateSession} data - Данные для обновления сессии
     * @returns {Promise<Session>} - Обновленная сессия
     */
    public updateSession(sessionId: string, data: IUpdateSession): Promise<Session> {
        return this.sessionRepository.updateSession(sessionId, data);
    }

    /**
     * Создаёт новую сессию для пользователя.
     * @param {ICreateSession} data - Данные для создания сессии
     * @returns {Promise<Session>} - Созданная сессия
     */
    public createSession(data: ICreateSession): Promise<Session> {
        return this.sessionRepository.createSession(data);
    }

    /**
     * Удаляет сессию по токену и ID пользователя.
     * @param {string} token - Refresh-токен сессии
     * @param {number} userId - ID пользователя
     * @returns {Promise<number>} - Количество удалённых сессий
     */
    public deleteSessionByTokenAndUserId(token: string, userId: number): Promise<number> {
        return this.sessionRepository.deleteSessionByTokenAndUserId(token, userId);
    }

    /**
     * Удаляет все сессии пользователя.
     * @param {number} userId - ID пользователя
     * @returns {Promise<number>} - Количество удалённых сессий
     */
    public deleteSessionsByUserId(userId: number): Promise<number> {
        return this.sessionRepository.deleteSessionsByUserId(userId);
    }
}
