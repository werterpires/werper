import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersUtils } from './users.utils'
import { UtilsModule } from 'src/shared/utils/utils.module'
import { PeopleUtils } from '../people/people.utils'

const services = [UsersService, UsersRepository, UsersUtils, PeopleUtils]
@Module({
  imports: [UtilsModule],
  controllers: [UsersController],
  providers: services,
  exports: services
})
export class UsersModule {}
