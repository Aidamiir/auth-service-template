import { type NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { ENV } from '@/constants/env';

/**
 * Конфигурирует CORS (Cross-Origin Resource Sharing) для Fastify.
 * @param {NestFastifyApplication} app - Экземпляр Nest.js Fastify-приложения
 * @param {ConfigService} configService - Сервис конфигурации для получения переменных окружения
 */
export const configureCors = (app: NestFastifyApplication, configService: ConfigService) => {
    const corsOrigin = configService.get<string>(ENV.CORS_ORIGIN)!;
    const formattedCorsOrigins = corsOrigin
        .split(',')
        .map((origin) => origin.trim());

    app.enableCors({
        origin: formattedCorsOrigins,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['POST', 'OPTIONS'],
    });
}