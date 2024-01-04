import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { UsersService } from 'src/basics/users/users.service'
import * as bcrypt from 'bcrypt'
import { ErrorsService } from '../utils/errors.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly errorsService: ErrorsService
  ) {}
  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findUserByEmail(email)

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

      if (isPasswordValid) {
        return {
          ...user,
          passwordHash: undefined
        }
      }
      throw new UnauthorizedException('#Email e/ou senha incorretos.')
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Email e/ou senha incorretos.',
        'auth/validateUser'
      )
    }
  }
}
