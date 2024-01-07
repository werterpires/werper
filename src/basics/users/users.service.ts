import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { ICreateSignerUser, ICreateUser, IUser } from './types'
import { UsersUtils } from './users.utils'
import { UsersRepository } from './users.repository'
import { PeopleUtils } from '../people/people.utils'
import { ValidatesService } from 'src/shared/utils/validates.service'
import { ErrorsService } from 'src/shared/utils/errors.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly usersUtils: UsersUtils,
    private readonly usersRepository: UsersRepository,
    private readonly peopleUtils: PeopleUtils,
    private readonly validatesService: ValidatesService,
    private readonly errorsService: ErrorsService
  ) {}

  async createSignerUser(createUserDto: CreateUserDto): Promise<IUser> {
    const createUserData: ICreateSignerUser =
      await this.usersUtils.newCreateSignerUserData(createUserDto)

    const userId = await this.usersRepository.createSignerUser(createUserData)

    const newUserData = await this.usersRepository.findUserById(userId)

    const newUser = this.usersUtils.createUserFromDB(newUserData)

    newUser.person.cpf = this.peopleUtils.changeCpf(newUser.person.cpf)
    newUser.passwordHash = this.usersUtils.changePasswordHash(
      newUser.passwordHash
    )
    return newUser
  }

  async findUserByEmail(email: string): Promise<IUser> {
    try {
      const errorMessage = this.validatesService.validateEmail(email, '#')
      if (errorMessage.length > 1) {
        throw new BadRequestException(errorMessage)
      }

      const userData = await this.usersRepository.findUserByEmail(email)

      const user = this.usersUtils.createUserFromDB(userData)
      user.person.cpf = this.peopleUtils.changeCpf(user.person.cpf)
      return user
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível encontrar o usuário',
        'repository/findUserByEmail'
      )
    }
  }
}
