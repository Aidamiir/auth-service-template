import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { AuthController } from '@/controllers/auth.controller';
import { TelegramModule } from '@/modules/telegram.module';
import { SessionModule } from '@/modules/session.module';
import { UserModule } from '@/modules/user.module';
import { JwtStrategy } from '@/strategies/jwt.strategy';
import { ENV } from '@/constants/env';

@Module({
    imports: [TelegramModule, UserModule, SessionModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            secret: configService.get(ENV.JWT_SECRET),
        }),
    }),],
    exports: [AuthService],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
