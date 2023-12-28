import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { Person } from './types'

@Injectable()
export class PeopleUtils {
  createPeopleArray(consultResult: any[]): Person[] {
    const people: Person[] = consultResult.map((person) => {
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

    return people
  }

  createPerson(consultResult: any): Person {
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

    return person
  }

  newPerson(
    personId: number,
    name: string,
    surname: string | null,
    personType: 'f' | 'j',
    cpf: string | null,
    cnpj: string | null,
    birthDate: Date | null,
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
  ): Person {
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
}
