import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

import type { NestFastifyApplication } from '@nestjs/platform-fastify';

import { configureCors } from '@/config/configure-cors';
import { configurePipes } from '@/config/configure-pipes';
import { configureSwagger } from '@/config/configure-swagger';
import { API_MAP } from '@/constants/api-map';
import { ENV } from '@/constants/env';
import { MESSAGES } from '@/constants/messages';
import { SWAGGER } from '@/constants/swagger';
import { AllExceptionsFilter } from '@/filters/all-exception-filter';

async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    const configService = app.get(ConfigService);
    const port = configService.get<number>(ENV.PORT)!;

    app.useGlobalFilters(new AllExceptionsFilter());
    app.setGlobalPrefix(API_MAP.PREFIX);
    configureCors(app, configService);
    configureSwagger(app);
    configurePipes(app);

    await app.listen(port);

    logger.log(`${MESSAGES.APP.START}: http://localhost:${port}`);
    logger.log(`${MESSAGES.APP.SWAGGER}: http://localhost:${port}/${SWAGGER.URL}`);
}

bootstrap();
