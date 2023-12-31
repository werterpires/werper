import { Module } from '@nestjs/common'
import { PeopleService } from './people.service'
import { PeopleController } from './people.controller'
import { PeopleUtils } from './people.utils'
import { PeopleRepository } from './people.repository'
import { UtilsModule } from 'src/shared/utils/utils.module'
import { ValidatesService } from 'src/shared/utils/validates.service'

const services = [
  PeopleService,
  PeopleUtils,
  PeopleRepository,
  ValidatesService
]
@Module({
  imports: [UtilsModule],
  controllers: [PeopleController],
  providers: services,
  exports: services
})
export class PeopleModule {}
