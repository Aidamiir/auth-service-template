import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@/repositories/user.repository';
import { MESSAGES } from '@/constants/messages';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async getUser(telegramId: number) {
        const user = await this.userRepository.getUser(telegramId);
        if (!user) {
            throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
        }

        return user;
    }
}