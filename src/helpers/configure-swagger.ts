import { type NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { SWAGGER } from '@/constants/swagger';

export const configureSwagger = (app: NestFastifyApplication) => {
    const document = SwaggerModule.createDocument(app, SWAGGER.CONFIG, { ignoreGlobalPrefix: false });
    SwaggerModule.setup(SWAGGER.URL, app, document);
}