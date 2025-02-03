import { Injectable } from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { TelegramService } from '@/services/telegram.service';
import { TelegramLoginDto } from '@/dto/telegram-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly telegramService: TelegramService,
        private readonly userService: UserService
    ) {}

    public async telegramLogin(dto: TelegramLoginDto) {
        const initData = this.telegramService.extractInitData(dto.initData);
        return this.userService.getUser(initData.user.id);
    }
}