import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SWAGGER } from '@/constants/swagger';

export function LogoutSwaggerDecorator() {
    return applyDecorators(
        ApiOperation(SWAGGER.AUTH.LOGOUT.OPERATION),
        ApiResponse(SWAGGER.AUTH.LOGOUT.SUCCESS),
        ApiResponse(SWAGGER.COMMON.UNAUTHORIZED),
    );
}