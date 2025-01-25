import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/modules/auth.module';
import { ENV } from '@/constants/env';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ENV.FILE_NAME,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                CORS_ORIGIN: Joi.string().required(),
            }),
        }),
        AuthModule,
    ],
})
export class AppModule {}