import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SWAGGER } from '@/constants/swagger';

export function LoginSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ ...SWAGGER.AUTH.LOGIN.OPERATION }),
        ApiResponse({ ...SWAGGER.AUTH.LOGIN.SUCCESS }),
        ApiResponse({ ...SWAGGER.AUTH.LOGIN.NOT_FOUND }),
        ApiResponse({ ...SWAGGER.COMMON.INTERNAL_SERVER }),
    );
}