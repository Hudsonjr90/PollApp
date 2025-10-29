import { Test, TestingModule } from '@nestjs/testing';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';

describe('PollsController', () => {
  let controller: PollsController;
  let service: Partial<PollsService>;

  beforeEach(async () => {
    service = {
      findAll: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollsController],
      providers: [{ provide: PollsService, useValue: service }],
    }).compile();

    controller = module.get<PollsController>(PollsController);
  });

  it('should list polls', async () => {
    await expect(controller.findAll()).resolves.toEqual([]);
  });
});
