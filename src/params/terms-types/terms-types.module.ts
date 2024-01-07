import { Module } from '@nestjs/common'
import { TermsTypesService } from './terms-types.service'
import { TermsTypesController } from './terms-types.controller'
import { TermsTypesRepository } from './terms-types.repository'
import { TermsTypesUtils } from './terms-types.utils'
import { UtilsModule } from 'src/shared/utils/utils.module'

const services = [TermsTypesService, TermsTypesRepository, TermsTypesUtils]
@Module({
  imports: [UtilsModule],
  controllers: [TermsTypesController],
  providers: services,
  exports: services
})
export class TermsTypesModule {}
