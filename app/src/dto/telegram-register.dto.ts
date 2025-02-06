import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { SWAGGER } from '@/constants/swagger';

export class TelegramRegisterDto {
    @ApiProperty({ ...SWAGGER.AUTH.TELEGRAM.REGISTER.DTO.INIT_DATA })
    @IsNotEmpty()
    @IsString()
    initData!: string;
}
