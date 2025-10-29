import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePollDto } from './dto/create.poll.dto';

@Injectable()
export class PollsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePollDto) {
    const start = new Date(dto.startAt);
    const end = new Date(dto.endAt);
    if (end <= start) throw new BadRequestException('endAt must be after startAt');

    const poll = await this.prisma.poll.create({
      data: {
        question: dto.question,
        startAt: start,
        endAt: end,
        options: {
          create: dto.options.map(text => ({ text }))
        }
      },
      include: { options: true }
    });
    return poll;
  }

  async findAll() {
    return this.prisma.poll.findMany({ include: { options: true } });
  }

  async findOne(id: string) {
    return this.prisma.poll.findUnique({ where: { id }, include: { options: true } });
  }

  async vote(pollId: string, optionId: string) {
    // increment atomic
    const option = await this.prisma.pollOption.update({
      where: { id: optionId },
      data: { votes: { increment: 1 } }
    });
    // retornar poll atualizado
    const poll = await this.findOne(pollId);
    return poll;
  }

  // editar/excluir com regras de negócio: não permitir editar depois de iniciar, etc.
  async update(id: string, data: Partial<CreatePollDto>) {
    const poll = await this.findOne(id);
    if (!poll) {
      throw new BadRequestException('Poll not found');
    }
    const now = new Date();
    if (now >= poll.startAt) throw new BadRequestException('Poll already started and cannot be edited');

    // permitir apenas editar pergunta e opções antes do start
    // implementação simplificada aqui
    return this.prisma.poll.update({
      where: { id },
      data: {
        question: data.question,
        // manipulação de opções exigiria lógica para adicionar/remover
      },
      include: { options: true }
    });
  }

  async remove(id: string) {
    await this.prisma.poll.delete({ where: { id } });
    return { id };
  }
}
