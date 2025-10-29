import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PollsModule } from './polls/polls.module';


@Module({
imports: [PrismaModule, PollsModule],
})
export class AppModule {}