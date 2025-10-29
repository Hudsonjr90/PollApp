import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { PollsGateway } from './polls.gateway';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
imports: [PrismaModule],
controllers: [PollsController],
providers: [PollsService, PollsGateway],
})
export class PollsModule {}