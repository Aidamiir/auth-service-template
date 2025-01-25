import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createResponseBody } from '@/helpers/create-response-body';
import { RegisterSwaggerDecorator } from '@/decorators/register-swagger.decorator';
import { LoginSwaggerDecorator } from '@/decorators/login-swagger.decorator';
import { API_MAP } from '@/constants/api-map';
import { SWAGGER } from '@/constants/swagger';
import { LoginDto } from '@/dto/login.dto';
import { RegisterDto } from '@/dto/register.dto';

@ApiTags(SWAGGER.AUTH.TAG)
@Controller()
export class AuthController {
    constructor() {}

    @RegisterSwaggerDecorator()
    @Post(API_MAP.REGISTER)
    public async register(@Body() body: RegisterDto) {
        return createResponseBody({ data: body });
    }

    @LoginSwaggerDecorator()
    @HttpCode(HttpStatus.OK)
    @Post(API_MAP.LOGIN)
    public async login(@Body() body: LoginDto) {
        return createResponseBody({ data: body });
    }
}
