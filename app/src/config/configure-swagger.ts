import { type NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SWAGGER } from '@/constants/swagger';

/**
 * Конфигурирует и настраивает Swagger-документацию для API.
 * @param {NestFastifyApplication} app - Экземпляр Nest.js Fastify-приложения
 */
export const configureSwagger = (app: NestFastifyApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Auth Service API')
        .setDescription('API сервис авторизации')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });
    SwaggerModule.setup(SWAGGER.URL, app, document);
};
