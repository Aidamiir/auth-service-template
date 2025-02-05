import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SWAGGER } from '@/constants/swagger';

export function RegisterSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ ...SWAGGER.AUTH.REGISTER.OPERATION }),
        ApiResponse({ ...SWAGGER.AUTH.REGISTER.SUCCESS }),
    );
}