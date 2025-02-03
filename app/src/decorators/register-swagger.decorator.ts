import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SWAGGER } from '@/constants/swagger';

export function RegisterSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ ...SWAGGER.AUTH.REGISTER.OPERATION }),
        ApiResponse({ ...SWAGGER.AUTH.REGISTER.SUCCESS }),
        ApiResponse({ ...SWAGGER.AUTH.REGISTER.CONFLICT }),
        ApiResponse({ ...SWAGGER.COMMON.BAD_REQUEST }),
        ApiResponse({ ...SWAGGER.COMMON.INTERNAL_SERVER }),
    );
}