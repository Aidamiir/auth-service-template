import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from '@/helpers/configure-swagger';
import { configureCors } from '@/helpers/configure-cors';
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
    const port = configService.get<number>(ENV.PORT);

    configureCors(app, configService);
    app.setGlobalPrefix(API_MAP.PREFIX);

    configureSwagger(app);
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
    }));

    await app.listen(port);

    logger.log(`${MESSAGES.APP.START}: http://localhost:${port}`);
    logger.log(`${MESSAGES.APP.SWAGGER}: http://localhost:${port}/${SWAGGER.URL}`);
}

bootstrap();