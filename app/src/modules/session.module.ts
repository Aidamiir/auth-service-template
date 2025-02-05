import { Module } from '@nestjs/common';
import { PrismaModule } from '@/modules/prisma.module';
import { SessionService } from '@/services/session.service';
import { SessionRepository } from '@/repositories/session.repository';

@Module({
    imports: [PrismaModule],
    providers: [SessionService, SessionRepository],
    exports: [SessionService],
})
export class SessionModule {}
