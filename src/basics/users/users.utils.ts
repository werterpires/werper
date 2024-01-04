import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'

import { ValidatesService } from 'src/shared/utils/validates.service'
import { ICreateUser, IUser } from './types'
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

  async newCreateUserData(createUserDto: CreateUserDto): Promise<ICreateUser> {
    const errorMessage = this.validatesService.validatePerson(
      createUserDto.cpf,
      undefined,
      createUserDto.email,
      undefined,
      undefined
    )

    if (errorMessage.length > 1) {
      throw new BadRequestException(errorMessage)
    }

    return {
      active: true,
      cellphone: createUserDto.cellphone,
      email: createUserDto.email,
      name: createUserDto.name,
      passwordHash: await bcrypt.hash(createUserDto.password, 16),
      personType: 'f',
      surname: createUserDto.surname,
      cpf: createUserDto.cpf,
      phone: createUserDto.phone ? createUserDto.phone : null
    }
  }

  // newUpdatePersonData(updatePersonDto: UpdatePersonDto): IUpdatePersonData {
  //   const errorMessage = this.validatesService.validatePerson(
  //     updatePersonDto.cpf,
  //     updatePersonDto.cnpj,
  //     updatePersonDto.email,
  //     updatePersonDto.birthDate,
  //     updatePersonDto.zipCode
  //   )
  //   if (errorMessage.length > 1) {
  //     throw new BadRequestException(errorMessage)
  //   }
  //   return {
  //     personId: updatePersonDto.personId,
  //     name: updatePersonDto.name,
  //     surname: updatePersonDto.surname,
  //     personType: updatePersonDto.personType,
  //     cpf: updatePersonDto.cpf,
  //     cnpj: updatePersonDto.cnpj,
  //     birthDate: new Date(updatePersonDto.birthDate),
  //     address: updatePersonDto.address,
  //     number: updatePersonDto.number,
  //     city: updatePersonDto.city,
  //     state: updatePersonDto.state,
  //     zipCode: updatePersonDto.zipCode,
  //     complement: updatePersonDto.complement,
  //     neighborhood: updatePersonDto.neighborhood,
  //     email: updatePersonDto.email,
  //     phone: updatePersonDto.phone,
  //     cellphone: updatePersonDto.cellphone,
  //     updatedAt: new Date()
  //   }
  // }

  changePasswordHash(passwordHash: string | null): string | null {
    if (passwordHash) {
      return 'pass'
    }
    return null
  }
}
