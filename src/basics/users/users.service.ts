import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { ICreateUser, IUser } from './types'
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

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const createUserData: ICreateUser =
      await this.usersUtils.newCreateUserData(createUserDto)

    const userId = await this.usersRepository.createUser(createUserData)

    const newUserData = await this.usersRepository.findUserById(userId)

    const newUser = this.usersUtils.createUserFromDB(newUserData)

    newUser.person.cpf = this.peopleUtils.changeCpf(newUser.person.cpf)
    newUser.passwordHash = this.usersUtils.changePasswordHash(
      newUser.passwordHash
    )
    return newUser
  }

  findAll() {
    return `This action returns all users`
  }

  async findUserByEmail(email: string): Promise<IUser> {
    try {
      if (!this.validatesService.validateEmail(email)) {
        throw new BadRequestException('#Email inválido')
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

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
