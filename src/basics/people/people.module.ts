import { Module } from '@nestjs/common'
import { PeopleService } from './people.service'
import { PeopleController } from './people.controller'
import { PeopleUtils } from './people.utils'
import { PeopleRepository } from './people.repository'

const services = [PeopleService, PeopleUtils, PeopleRepository]
@Module({
  controllers: [PeopleController],
  providers: services,
  exports: services
})
export class PeopleModule {}
