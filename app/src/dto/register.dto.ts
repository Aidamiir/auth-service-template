import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { SWAGGER } from '@/constants/swagger';

export class RegisterDto {
    @ApiProperty({ ...SWAGGER.AUTH.REGISTER.DTO.EMAIL })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({ ...SWAGGER.AUTH.REGISTER.DTO.PASSWORD })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password!: string;
}
