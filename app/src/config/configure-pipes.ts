import { ValidationPipe } from '@nestjs/common';

import type { NestFastifyApplication } from '@nestjs/platform-fastify';

/**
 * Конфигурирует глобальные валидационные пайпы для Nest.js.
 * @param {NestFastifyApplication} app - Экземпляр Nest.js Fastify-приложения
 */
export const configurePipes = (app: NestFastifyApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            stopAtFirstError: true,
        }),
    );
};
