import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'

import { ValidatesService } from 'src/shared/utils/validates.service'
import { ICreateSignerUser, ICreateUser, IUser } from './types'
import { PeopleUtils } from '../people/people.utils'
import { IPerson } from '../people/types'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersUtils {
  constructor(
    private readonly validatesService: ValidatesService,
    private readonly personsUtils: PeopleUtils
  ) {}

  createUsersArrayFromDB(consultResult: any[]): IUser[] {
    const users: IUser[] = consultResult.map((user) => {
      const person = this.personsUtils.newPerson(
        user.person_id,
        user.name,
        user.surname,
        user.person_type,
        user.cpf,
        user.cnpj,
        user.birth_date,
        user.address,
        user.number,
        user.city,
        user.state,
        user.zip_code,
        user.complement,
        user.neighborhood,
        user.email,
        user.phone,
        user.cellphone
      )
      return this.newUser(
        user.user_id,
        user.person_id,
        user.passwordHash,
        user.active,
        person
      )
    })

    users.forEach((user) => {
      for (let prop of Object.entries(user)) {
        if (prop[1] === undefined) {
          throw new InternalServerErrorException(
            `Propriedade ${prop[0]} não foi encontrada`
          )
        }
      }
    })

    return users
  }

  createUserFromDB(consultResult: any): IUser {
    const person = this.personsUtils.newPerson(
      consultResult.person_id,
      consultResult.name,
      consultResult.surname,
      consultResult.person_type,
      consultResult.cpf,
      consultResult.cnpj,
      consultResult.birth_date,
      consultResult.address,
      consultResult.number,
      consultResult.city,
      consultResult.state,
      consultResult.zip_code,
      consultResult.complement,
      consultResult.neighborhood,
      consultResult.email,
      consultResult.phone,
      consultResult.cellphone
    )

    const user = this.newUser(
      consultResult.user_id,
      consultResult.person_id,
      consultResult.password_hash,
      consultResult.active,
      person
    )

    for (let prop of Object.entries(user)) {
      if (prop[1] === undefined) {
        throw new InternalServerErrorException(
          `#Propriedade ${prop[0]} não foi encontrada`
        )
      }
    }

    return user
  }

  newUser(
    userId: number,
    personId: number,
    passwordHash: string,
    active: boolean,
    person: IPerson
  ): IUser {
    return {
      userId,
      personId,
      passwordHash,
      active,
      person
    }
  }

  async newCreateSignerUserData(
    createUserDto: CreateUserDto
  ): Promise<ICreateSignerUser> {
    let errorMessage = this.validatesService.validatePerson(
      createUserDto.cpf,
      undefined,
      createUserDto.email,
      undefined,
      undefined
    )

    errorMessage = this.validatesService.validatePerson(
      createUserDto.companyPerson.cpf,
      createUserDto.companyPerson.cnpj,
      createUserDto.companyPerson.email,
      createUserDto.companyPerson.birthDate,
      createUserDto.companyPerson.zipCode
    )

    if (errorMessage.length > 1) {
      throw new BadRequestException(errorMessage)
    }

    const companyPerson = this.personsUtils.newCreatePersonData(
      createUserDto.companyPerson
    )

    return {
      active: true,
      cellphone: createUserDto.cellphone,
      email: createUserDto.email,
      name: createUserDto.name,
      passwordHash: await bcrypt.hash(createUserDto.password, 16),
      personType: 'f',
      surname: createUserDto.surname,
      cpf: createUserDto.cpf,
      phone: createUserDto.phone ? createUserDto.phone : null,
      roles: [2],
      occupationsPermissions: createUserDto.occupationsPermissions,
      subscriptionTitle: 'Padrão',
      subscriptionActive: true,
      subscriptionHistoric: 'Inscrição inicial no werper',
      companiesNumber: 1,
      price: 250,
      companyDescription: '',
      companyPerson,
      logged: false,
      validate: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000),
      usersNumber: 1
    }
  }

  changePasswordHash(passwordHash: string | null): string | null {
    if (passwordHash) {
      return 'pass'
    }
    return null
  }
}
