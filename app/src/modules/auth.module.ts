import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { ENV } from '@/constants/env';
import { AuthController } from '@/controllers/auth.controller';
import { SessionModule } from '@/modules/session.module';
import { TelegramModule } from '@/modules/telegram.module';
import { UserModule } from '@/modules/user.module';
import { AuthService } from '@/services/auth.service';
import { JwtStrategy } from '@/strategies/jwt.strategy';

@Module({
    imports: [
        TelegramModule,
        UserModule,
        SessionModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get(ENV.JWT_SECRET),
            }),
        }),
    ],
    exports: [AuthService],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
