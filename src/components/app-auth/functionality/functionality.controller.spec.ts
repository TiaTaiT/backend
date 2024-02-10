import { Test, TestingModule } from '@nestjs/testing';
import { FunctionalityController } from './functionality.controller';
import { FunctionalityService } from './functionality.service';

describe('FunctionalityController', () => {
  let controller: FunctionalityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FunctionalityController],
      providers: [FunctionalityService],
    }).compile();

    controller = module.get<FunctionalityController>(FunctionalityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
