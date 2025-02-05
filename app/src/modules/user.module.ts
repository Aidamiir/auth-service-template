import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/prisma.module';
import { UserRepository } from '@/repositories/user.repository';
import { UserService } from '@/services/user.service';

@Module({
    imports: [PrismaModule],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserModule {}
