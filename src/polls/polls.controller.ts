import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto, CreatePollSchema } from './dto/create.poll.dto';
import { z } from 'zod';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  async create(@Body() body: any) {
    const dto = CreatePollSchema.parse(body);
    return this.pollsService.create(dto);
  }

  @Get()
  async findAll() {
    return this.pollsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pollsService.findOne(id);
  }

  @Post(':id/vote')
  async vote(@Param('id') id: string, @Body() body: any) {
    const { optionId } = z.object({ optionId: z.string().uuid() }).parse(body);
    const poll = await this.pollsService.vote(id, optionId);
    // aqui emitir evento via gateway seria ideal (injete PollsGateway no controller)
    return poll;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    // validar etc
    return this.pollsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pollsService.remove(id);
  }
}
