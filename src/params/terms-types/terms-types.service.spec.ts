import { Test, TestingModule } from '@nestjs/testing';
import { TermsTypesService } from './terms-types.service';

describe('TermsTypesService', () => {
  let service: TermsTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermsTypesService],
    }).compile();

    service = module.get<TermsTypesService>(TermsTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
