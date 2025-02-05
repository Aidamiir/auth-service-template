import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/prisma.module';
import { SessionRepository } from '@/repositories/session.repository';
import { SessionService } from '@/services/session.service';

@Module({
    imports: [PrismaModule],
    providers: [SessionService, SessionRepository],
    exports: [SessionService],
})
export class SessionModule {}
