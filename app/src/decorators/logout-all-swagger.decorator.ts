import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SWAGGER } from '@/constants/swagger';

export function LogoutAllSwaggerDecorator() {
    return applyDecorators(
        ApiOperation(SWAGGER.AUTH.LOGOUT_ALL.OPERATION),
        ApiResponse(SWAGGER.AUTH.LOGOUT_ALL.SUCCESS),
        ApiResponse(SWAGGER.COMMON.UNAUTHORIZED),
    );
}