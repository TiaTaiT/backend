import { Test, TestingModule } from '@nestjs/testing';
import { PimService } from './pim.service';

describe('PimService', () => {
  let service: PimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PimService],
    }).compile();

    service = module.get<PimService>(PimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
