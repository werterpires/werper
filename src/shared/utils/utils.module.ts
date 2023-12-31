import { Module } from '@nestjs/common'
import { ErrorsService } from './errors.service'
import { ErrorsUtils } from './errors.utils'
import { ValidatesService } from './validates.service'

const services = [ErrorsService, ErrorsUtils, ValidatesService]
@Module({
  controllers: [],
  providers: services,
  exports: services
})
export class UtilsModule {}
