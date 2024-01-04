import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategies/local.strategy'
import { UsersModule } from 'src/basics/users/users.module'
import { ErrorsService } from '../utils/errors.service'
import { UtilsModule } from '../utils/utils.module'
import { JwtModule } from '@nestjs/jwt'
import * as dotenv from 'dotenv'
import { JwtStrategy } from './strategies/jwt.strategy'
dotenv.config()

@Module({
  imports: [
    UsersModule,
    UtilsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '11h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
