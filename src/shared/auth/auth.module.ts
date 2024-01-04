import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategies/local.strategy'
import { UsersModule } from 'src/basics/users/users.module'
import { ErrorsService } from '../utils/errors.service'
import { UtilsModule } from '../utils/utils.module'

@Module({
  imports: [UsersModule, UtilsModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
