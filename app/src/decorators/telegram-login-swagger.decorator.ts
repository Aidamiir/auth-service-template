import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SWAGGER } from '@/constants/swagger';

export function TelegramLoginSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ ...SWAGGER.AUTH.TELEGRAM_LOGIN.OPERATION }),
        ApiResponse({ ...SWAGGER.AUTH.TELEGRAM_LOGIN.SUCCESS }),
    );
}