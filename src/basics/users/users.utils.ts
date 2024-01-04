import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'

import { ValidatesService } from 'src/shared/utils/validates.service'
import { IUser } from './types'
import { PeopleUtils } from '../people/people.utils'
import { IPerson } from '../people/types'

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
      consultResult.passwordHash,
      consultResult.active,
      person
    )

    for (let prop of Object.entries(user)) {
      if (prop[1] === undefined) {
        throw new InternalServerErrorException(
          `Propriedade ${prop[0]} não foi encontrada`
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

  // newCreateUserData(: CreatePersonDto): ICreatePersonData {
  //   const errorMessage = this.validatesService.validatePerson(
  //     createPersonDto.cpf,
  //     createPersonDto.cnpj,
  //     createPersonDto.email,
  //     createPersonDto.birthDate,
  //     createPersonDto.zipCode
  //   )

  //   if (errorMessage.length > 1) {
  //     throw new BadRequestException(errorMessage)
  //   }

  //   return {
  //     name: createPersonDto.name.trim(),
  //     surname: createPersonDto.surname ? createPersonDto.surname.trim() : null,
  //     personType: createPersonDto.personType,
  //     cpf: createPersonDto.cpf ? createPersonDto.cpf.trim() : null,
  //     cnpj: createPersonDto.cnpj ? createPersonDto.cnpj.trim() : null,
  //     birthDate: createPersonDto.birthDate
  //       ? new Date(createPersonDto.birthDate.trim())
  //       : null,
  //     address: createPersonDto.address ? createPersonDto.address.trim() : null,
  //     number: createPersonDto.number ? createPersonDto.number.trim() : null,
  //     city: createPersonDto.city ? createPersonDto.city.trim() : null,
  //     state: createPersonDto.state ? createPersonDto.state.trim() : null,
  //     zipCode: createPersonDto.zipCode ? createPersonDto.zipCode.trim() : null,
  //     complement: createPersonDto.complement
  //       ? createPersonDto.complement.trim()
  //       : null,
  //     neighborhood: createPersonDto.neighborhood
  //       ? createPersonDto.neighborhood.trim()
  //       : null,
  //     email: createPersonDto.email ? createPersonDto.email.trim() : null,
  //     phone: createPersonDto.phone ? createPersonDto.phone.trim() : null,
  //     cellphone: createPersonDto.cellphone
  //       ? createPersonDto.cellphone.trim()
  //       : null
  //   }
  // }

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
}
