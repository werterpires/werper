import { Module } from '@nestjs/common';
import { TermsTypesService } from './terms-types.service';
import { TermsTypesController } from './terms-types.controller';

@Module({
  controllers: [TermsTypesController],
  providers: [TermsTypesService],
})
export class TermsTypesModule {}
