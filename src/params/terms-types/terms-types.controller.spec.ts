import { Test, TestingModule } from '@nestjs/testing';
import { TermsTypesController } from './terms-types.controller';
import { TermsTypesService } from './terms-types.service';

describe('TermsTypesController', () => {
  let controller: TermsTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermsTypesController],
      providers: [TermsTypesService],
    }).compile();

    controller = module.get<TermsTypesController>(TermsTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
