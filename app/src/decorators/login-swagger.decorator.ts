import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SWAGGER } from '@/constants/swagger';

export const LoginSwaggerDecorator = () => {
    return applyDecorators(
        ApiOperation({ ...SWAGGER.AUTH.LOGIN.OPERATION }),
        ApiResponse({ ...SWAGGER.AUTH.LOGIN.SUCCESS }),
    );
};
