import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SWAGGER } from '@/constants/swagger';

export function RefreshTokensSwaggerDecorator() {
    return applyDecorators(
        ApiOperation(SWAGGER.AUTH.REFRESH.OPERATION),
        ApiResponse(SWAGGER.AUTH.REFRESH.SUCCESS),
        ApiResponse(SWAGGER.COMMON.UNAUTHORIZED),
    );
}
