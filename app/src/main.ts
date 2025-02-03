import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@/filters/all-exception-filter';
import { configureSwagger } from '@/config/configure-swagger';
import { configurePipes } from '@/config/configure-pipes';
import { configureCors } from '@/config/configure-cors';
import { API_MAP } from '@/constants/api-map';
import { SWAGGER } from '@/constants/swagger';
import { MESSAGES } from '@/constants/messages';
import { ENV } from '@/constants/env';

async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );
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