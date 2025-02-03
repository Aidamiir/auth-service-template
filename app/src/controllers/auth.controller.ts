import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createResponseBody } from '@/helpers/create-response-body';
import { RegisterSwaggerDecorator } from '@/decorators/register-swagger.decorator';
import { TelegramLoginSwaggerDecorator } from '@/decorators/telegram-login-swagger.decorator';
import { LoginSwaggerDecorator } from '@/decorators/login-swagger.decorator';
import { AuthService } from '@/services/auth.service';
import { API_MAP } from '@/constants/api-map';
import { SWAGGER } from '@/constants/swagger';
import { MESSAGES } from '@/constants/messages';
import { LoginDto } from '@/dto/login.dto';
import { RegisterDto } from '@/dto/register.dto';
import { TelegramLoginDto } from '@/dto/telegram-login.dto';

@ApiTags(SWAGGER.AUTH.TAG)
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @RegisterSwaggerDecorator()
    @Post(API_MAP.REGISTER)
    public async register(@Body() dto: RegisterDto) {
        return createResponseBody({ data: dto });
    }

    @LoginSwaggerDecorator()
    @HttpCode(HttpStatus.OK)
    @Post(API_MAP.LOGIN)
    public async login(@Body() dto: LoginDto) {
        return createResponseBody({ data: dto });
    }

    @TelegramLoginSwaggerDecorator()
    @HttpCode(HttpStatus.OK)
    @Post(API_MAP.TELEGRAM_LOGIN)
    public async telegramLogin(@Body() dto: TelegramLoginDto) {
        const user = await this.authService.telegramLogin(dto);
        return createResponseBody({ data: user, message: MESSAGES.AUTH.LOGIN.SUCCESS });
    }
}
