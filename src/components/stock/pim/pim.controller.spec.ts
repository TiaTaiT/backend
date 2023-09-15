import { Test, TestingModule } from '@nestjs/testing';
import { PimController } from './pim.controller';
import { PimService } from './pim.service';

describe('PimController', () => {
  let controller: PimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PimController],
      providers: [PimService],
    }).compile();

    controller = module.get<PimController>(PimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
