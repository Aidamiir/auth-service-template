import { Module } from '@nestjs/common';
import { PrismaModule } from '@/modules/prisma.module';
import { UserService } from '@/services/user.service';
import { UserRepository } from '@/repositories/user.repository';

@Module({
    imports: [PrismaModule],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserModule {}
