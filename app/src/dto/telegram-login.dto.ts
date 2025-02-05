import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { SWAGGER } from '@/constants/swagger';

export class TelegramLoginDto {
    @ApiProperty({ ...SWAGGER.AUTH.TELEGRAM_LOGIN.DTO.INIT_DATA })
    @IsNotEmpty()
    @IsString()
    initData!: string;
}
