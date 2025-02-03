import { Module } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { AuthController } from '@/controllers/auth.controller';
import { TelegramModule } from '@/modules/telegram.module';
import { UserModule } from '@/modules/user.module';

@Module({
  imports: [TelegramModule, UserModule],
  exports: [AuthService],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
