import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { IGenerateTokens } from '@/interfaces/generate-tokens.interface';
import type { ITokenPayload } from '@/interfaces/token-payload.interface';
import type { Response, Request } from 'express';

import { MESSAGES } from '@/constants/messages';
import { SessionService } from '@/services/session.service';
import { TelegramService } from '@/services/telegram.service';
import { UserService } from '@/services/user.service';

@Injectable()
export class AuthService {
    private readonly ACCESS_TOKEN_EXPIRES = '15m';
    private readonly REFRESH_TOKEN_EXPIRES_DAYS = 7;
    private readonly REFRESH_TOKEN_KEY = 'refresh-token';

    constructor(
        private readonly telegramService: TelegramService,
        private readonly sessionService: SessionService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    /**
     * Генерирует access и refresh токены.
     * @param {ITokenPayload} payload - Полезная нагрузка JWT
     * @returns {IGenerateTokens} - Объект с токенами
     */
    public generateTokens(payload: ITokenPayload): IGenerateTokens {
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.ACCESS_TOKEN_EXPIRES,
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.REFRESH_TOKEN_EXPIRES_DAYS + 'd',
        });

        return { accessToken, refreshToken };
    }

    /**
     * Устанавливает refresh-токен в HTTP-only cookie.
     * @param {string} refresh_token - Refresh-токен
     * @param {Response} res - Объект ответа Express
     */
    public setRefreshTokenInCookie(refresh_token: string, res: Response) {
        res.cookie(this.REFRESH_TOKEN_KEY, refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: this.REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
        });
    }

    /**
     * Логин через Telegram WebApp.
     * @param {string} initData - Данные Telegram WebApp
     * @param {Response} res - Объект ответа Express
     * @param {Request} req - Объект запроса Express
     * @returns {Promise<{ accessToken: string }>} - Объект с access-токеном
     */
    public async loginWithTelegram(
        initData: string,
        res: Response,
        req: Request,
    ): Promise<{ accessToken: string }> {
        const { user: tgData } = this.telegramService.extractInitData(initData);
        const user = await this.userService.getUserByTelegramId(tgData.id);
        const tokens = this.generateTokens({ userId: user.id, telegramId: user.telegramId });
        const cookieRefreshToken: string | null = req.cookies[this.REFRESH_TOKEN_KEY];

        if (cookieRefreshToken) {
            const sessions = await this.sessionService.getSessionsByUserId(user.id);
            const currentSession = sessions.find(
                (session) => session.refreshToken === cookieRefreshToken,
            );

            if (currentSession) {
                await this.sessionService.updateSession(currentSession.id, {
                    refreshToken: tokens.refreshToken,
                    expiresAt: new Date(
                        Date.now() + this.REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
                    ),
                });
                this.setRefreshTokenInCookie(tokens.refreshToken, res);
                return { accessToken: tokens.accessToken };
            }
        }

        await this.sessionService.createSession({
            userId: user.id,
            refreshToken: tokens.refreshToken,
            ip: req.ip,
            userAgent: req.headers['user-agent'] || 'Unknown',
            expiresAt: new Date(Date.now() + this.REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000),
        });

        this.setRefreshTokenInCookie(tokens.refreshToken, res);
        return { accessToken: tokens.accessToken };
    }

    /**
     * Обновляет access-токен с помощью refresh-токена.
     * @param {Request} req - Объект запроса Express
     * @param {Response} res - Объект ответа Express
     * @returns {Promise<{ accessToken: string }>} - Новый access-токен
     * @throws {UnauthorizedException} - Если refresh-токен отсутствует или недействителен
     */
    public async refreshTokens(req: Request, res: Response): Promise<{ accessToken: string }> {
        const refreshToken: string | null = req.cookies[this.REFRESH_TOKEN_KEY];
        const user = req.user as ITokenPayload;
        const tokens = this.generateTokens({ userId: user.userId, telegramId: user.telegramId });

        if (!refreshToken) {
            throw new UnauthorizedException(MESSAGES.AUTH.INVALID_REFRESH_TOKEN);
        }

        const sessions = await this.sessionService.getSessionsByUserId(user.userId);
        const currentSession = sessions.find((session) => session.refreshToken === refreshToken);

        if (!currentSession) {
            throw new UnauthorizedException(MESSAGES.AUTH.INVALID_REFRESH_TOKEN);
        }

        await this.sessionService.updateSession(currentSession.id, {
            refreshToken: tokens.refreshToken,
            expiresAt: new Date(Date.now() + this.REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000),
        });

        this.setRefreshTokenInCookie(tokens.refreshToken, res);
        return { accessToken: tokens.accessToken };
    }

    /**
     * Завершает текущую сессию пользователя (logout).
     * @param {Request} req - Объект запроса Express
     * @param {Response} res - Объект ответа Express
     * @throws {UnauthorizedException} - Если refresh-токен отсутствует
     */
    public async logout(req: Request, res: Response) {
        const user = req.user as ITokenPayload;
        const refreshToken: string | null = req.cookies[this.REFRESH_TOKEN_KEY];

        if (!refreshToken) {
            throw new UnauthorizedException(MESSAGES.AUTH.INVALID_REFRESH_TOKEN);
        }

        res.clearCookie(this.REFRESH_TOKEN_KEY);
        await this.sessionService.deleteSessionByTokenAndUserId(refreshToken, user.userId);
    }

    /**
     * Завершает все сессии пользователя (logout из всех устройств).
     * @param {Request} req - Объект запроса Express
     * @param {Response} res - Объект ответа Express
     * @throws {UnauthorizedException} - Если у пользователя нет активных сессий
     */
    public async logoutAll(req: Request, res: Response) {
        const user = req.user as ITokenPayload;

        const sessions = await this.sessionService.getSessionsByUserId(user.userId);
        if (!sessions.length) {
            throw new UnauthorizedException(MESSAGES.AUTH.NO_ACTIVE_SESSIONS);
        }

        res.clearCookie(this.REFRESH_TOKEN_KEY);
        await this.sessionService.deleteSessionsByUserId(user.userId);
    }
}
