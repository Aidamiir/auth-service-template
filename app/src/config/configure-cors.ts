import { type NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { HEADERS } from '@/constants/headers';
import { METHODS } from '@/constants/methods';
import { ENV } from '@/constants/env';

export const configureCors = (app: NestFastifyApplication, configService: ConfigService) => {
    const corsOrigin = configService.get<string>(ENV.CORS_ORIGIN)!;
    const formattedCorsOrigins = corsOrigin
        .split(',')
        .map((origin) => origin.trim());

    app.enableCors({
        origin: formattedCorsOrigins,
        credentials: true,
        allowedHeaders: [HEADERS.AUTHORIZATION, HEADERS.CONTENT_TYPE],
        methods: [METHODS.POST, METHODS.OPTIONS]
    });
}