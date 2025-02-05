import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { TelegramLoginSwaggerDecorator } from '@/decorators/telegram-login-swagger.decorator';
import { RefreshTokensSwaggerDecorator } from '@/decorators/refresh-tokens.swagger.decorator';
import { LogoutAllSwaggerDecorator } from '@/decorators/logout-all-swagger.decorator';
import { RegisterSwaggerDecorator } from '@/decorators/register-swagger.decorator';
import { LogoutSwaggerDecorator } from '@/decorators/logout-swagger.decorator';
import { LoginSwaggerDecorator } from '@/decorators/login-swagger.decorator';
import { AuthDecorator } from '@/decorators/auth.decorator';
import { createResponseBody } from '@/helpers/create-response-body';
import { TelegramLoginDto } from '@/dto/telegram-login.dto';
import { RegisterDto } from '@/dto/register.dto';
import { LoginDto } from '@/dto/login.dto';
import { SWAGGER } from '@/constants/swagger';
import { API_MAP } from '@/constants/api-map';
import { MESSAGES } from '@/constants/messages';

@ApiTags(SWAGGER.AUTH.TAG)
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Регистрация нового пользователя.
     */
    @RegisterSwaggerDecorator()
    @Post(API_MAP.REGISTER)
    public async register(@Body() dto: RegisterDto): Promise<object> {
        return createResponseBody({ data: dto });
    }

    /**
     * Авторизация пользователя (email + пароль).
     */
    @LoginSwaggerDecorator()
    @HttpCode(HttpStatus.OK)
    @Post(API_MAP.LOGIN)
    public async login(@Body() dto: LoginDto) {
        return createResponseBody({ data: dto });
    }

    /**
     * Авторизация через Telegram WebApp.
     */
    @TelegramLoginSwaggerDecorator()
    @HttpCode(HttpStatus.OK)
    @Post(API_MAP.TELEGRAM_LOGIN)
    public async telegramLogin(@Body() dto: TelegramLoginDto, @Res() res: Response, @Req() req: Request) {
        const data = await this.authService.loginWithTelegram(dto.initData, res, req);
        return createResponseBody({ data, message: MESSAGES.AUTH.LOGIN.SUCCESS });
    }

    /**
     * Выход из текущей сессии.
     */
    @LogoutSwaggerDecorator()
    @HttpCode(HttpStatus.OK)
    @Post(API_MAP.LOGOUT)
    @AuthDecorator()
    public async logout(@Req() req: Request, @Res() res: Response) {
        await this.authService.logout(req, res);
        return createResponseBody({ message: MESSAGES.AUTH.LOGOUT.SUCCESS });
    }

    /**
     * Выход из всех активных сессий.
     */
    @LogoutAllSwaggerDecorator()
    @HttpCode(HttpStatus.OK)
    @Post(API_MAP.LOGOUT_ALL)
    @AuthDecorator()
    public async logoutAll(@Req() req: Request, @Res() res: Response) {
        await this.authService.logoutAll(req, res);
        return createResponseBody({ message: MESSAGES.AUTH.LOGOUT_ALL.SUCCESS });
    }

    /**
     * Обновление токенов с помощью refresh-токена.
     */
    @RefreshTokensSwaggerDecorator()
    @HttpCode(HttpStatus.OK)
    @Post(API_MAP.REFRESH_TOKENS)
    public async refreshTokens(@Req() req: Request, @Res() res: Response) {
        const data = await this.authService.refreshTokens(req, res);
        return createResponseBody({ data, message: MESSAGES.AUTH.REFRESH.SUCCESS });
    }
}
