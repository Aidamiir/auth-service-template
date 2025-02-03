import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SWAGGER } from '@/constants/swagger';

export class LoginDto {
    @ApiProperty({ ...SWAGGER.AUTH.LOGIN.DTO.EMAIL })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({ ...SWAGGER.AUTH.LOGIN.DTO.PASSWORD })
    @IsNotEmpty()
    @IsString()
    password!: string;
}