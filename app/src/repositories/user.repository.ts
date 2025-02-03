import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from '@/services/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    public getUser(telegramId: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { telegramId } });
    }
}