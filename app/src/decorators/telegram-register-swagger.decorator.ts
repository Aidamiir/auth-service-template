import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SWAGGER } from '@/constants/swagger';

export function TelegramRegisterSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ ...SWAGGER.AUTH.TELEGRAM.REGISTER.OPERATION }),
        ApiResponse({ ...SWAGGER.AUTH.TELEGRAM.REGISTER.SUCCESS }),
    );
}
