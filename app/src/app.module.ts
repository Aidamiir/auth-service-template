import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { ENV } from '@/constants/env';
import { AuthModule } from '@/modules/auth.module';
import { PrismaModule } from '@/modules/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ENV.FILE_NAME,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                CORS_ORIGIN: Joi.string().required(),
                TELEGRAM_BOT_TOKEN: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
            }),
        }),
        PrismaModule,
        AuthModule,
    ],
})
export class AppModule {}
