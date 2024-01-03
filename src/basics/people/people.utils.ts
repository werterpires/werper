import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { ICreatePersonData, IUpdatePersonData, IPerson } from './types'
import { ValidatesService } from 'src/shared/utils/validates.service'

@Injectable()
export class PeopleUtils {
  constructor(private readonly validatesService: ValidatesService) {}

  createPeopleArrayFromDB(consultResult: any[]): IPerson[] {
    const people: IPerson[] = consultResult.map((person) => {
      return this.newPerson(
        person.person_id,
        person.name,
        person.surname,
        person.person_type,
        person.cpf,
        person.cnpj,
        person.birth_date,
        person.address,
        person.number,
        person.city,
        person.state,
        person.zip_code,
        person.complement,
        person.neighborhood,
        person.email,
        person.phone,
        person.cellphone
      )
    })

    people.forEach((person) => {
      for (let prop of Object.entries(person)) {
        if (prop[1] === undefined) {
          throw new InternalServerErrorException(
            `Propriedade ${prop[0]} não foi encontrada`
          )
        }
      }
    })

    return people
  }

  createPersonFromDB(consultResult: any): IPerson {
    const person = this.newPerson(
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

    for (let prop of Object.entries(person)) {
      if (prop[1] === undefined) {
        throw new InternalServerErrorException(
          `Propriedade ${prop[0]} não foi encontrada`
        )
      }
    }

    return person
  }

  newPerson(
    personId: number,
    name: string,
    surname: string | null,
    personType: 'f' | 'j',
    cpf: string | null,
    cnpj: string | null,
    birthDate: string | null,
    address: string | null,
    number: string | null,
    city: string | null,
    state: string | null,
    zipCode: string | null,
    complement: string | null,
    neighborhood: string | null,
    email: string | null,
    phone: string | null,
    cellphone: string | null
  ): IPerson {
    return {
      personId,
      name,
      surname,
      personType,
      cpf,
      cnpj,
      birthDate,
      address,
      number,
      city,
      state,
      zipCode,
      complement,
      neighborhood,
      email,
      phone,
      cellphone
    }
  }

  newCreatePersonData(createPersonDto: CreatePersonDto): ICreatePersonData {
    const errorMessage = this.validatesService.validatePerson(
      createPersonDto.cpf,
      createPersonDto.cnpj,
      createPersonDto.email,
      createPersonDto.birthDate,
      createPersonDto.zipCode
    )

    if (errorMessage.length > 1) {
      throw new BadRequestException(errorMessage)
    }

    return {
      name: createPersonDto.name.trim(),
      surname: createPersonDto.surname ? createPersonDto.surname.trim() : null,
      personType: createPersonDto.personType,
      cpf: createPersonDto.cpf ? createPersonDto.cpf.trim() : null,
      cnpj: createPersonDto.cnpj ? createPersonDto.cnpj.trim() : null,
      birthDate: createPersonDto.birthDate
        ? new Date(createPersonDto.birthDate.trim())
        : null,
      address: createPersonDto.address ? createPersonDto.address.trim() : null,
      number: createPersonDto.number ? createPersonDto.number.trim() : null,
      city: createPersonDto.city ? createPersonDto.city.trim() : null,
      state: createPersonDto.state ? createPersonDto.state.trim() : null,
      zipCode: createPersonDto.zipCode ? createPersonDto.zipCode.trim() : null,
      complement: createPersonDto.complement
        ? createPersonDto.complement.trim()
        : null,
      neighborhood: createPersonDto.neighborhood
        ? createPersonDto.neighborhood.trim()
        : null,
      email: createPersonDto.email ? createPersonDto.email.trim() : null,
      phone: createPersonDto.phone ? createPersonDto.phone.trim() : null,
      cellphone: createPersonDto.cellphone
        ? createPersonDto.cellphone.trim()
        : null
    }
  }

  newUpdatePersonData(updatePersonDto: UpdatePersonDto): IUpdatePersonData {
    const errorMessage = this.validatesService.validatePerson(
      updatePersonDto.cpf,
      updatePersonDto.cnpj,
      updatePersonDto.email,
      updatePersonDto.birthDate,
      updatePersonDto.zipCode
    )
    if (errorMessage.length > 1) {
      throw new BadRequestException(errorMessage)
    }
    return {
      personId: updatePersonDto.personId,
      name: updatePersonDto.name,
      surname: updatePersonDto.surname,
      personType: updatePersonDto.personType,
      cpf: updatePersonDto.cpf,
      cnpj: updatePersonDto.cnpj,
      birthDate: new Date(updatePersonDto.birthDate),
      address: updatePersonDto.address,
      number: updatePersonDto.number,
      city: updatePersonDto.city,
      state: updatePersonDto.state,
      zipCode: updatePersonDto.zipCode,
      complement: updatePersonDto.complement,
      neighborhood: updatePersonDto.neighborhood,
      email: updatePersonDto.email,
      phone: updatePersonDto.phone,
      cellphone: updatePersonDto.cellphone,
      updatedAt: new Date()
    }
  }

  changeCpf(cpf: string | null) {
    if (cpf) return '00000000000'
    return null
  }
}
