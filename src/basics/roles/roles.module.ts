import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { RolesRepository } from './roles.repository'
import { RolesUtils } from './roles.utils'
import { UtilsModule } from 'src/shared/utils/utils.module'

const services = [RolesService, RolesRepository, RolesUtils]
@Module({
  imports: [UtilsModule],
  controllers: [RolesController],
  providers: services
})
export class RolesModule {}
