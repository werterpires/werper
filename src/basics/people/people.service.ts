import { BadRequestException, Injectable } from '@nestjs/common'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { PeopleUtils } from './people.utils'
import { ErrorsService } from 'src/shared/utils/errors.service'
import { PeopleRepository } from './people.repository'
import { Person } from './types'
import { ValidatesService } from 'src/shared/utils/validates.service'

@Injectable()
export class PeopleService {
  constructor(
    private readonly peopleUtils: PeopleUtils,
    private readonly errorsService: ErrorsService,
    private readonly peopleRepository: PeopleRepository
  ) {}
  async createPerson(createPersonDto: CreatePersonDto): Promise<Person> {
    try {
      const newPersonData =
        this.peopleUtils.newCreatePersonData(createPersonDto)

      const newPerson = await this.peopleRepository.createPerson(newPersonData)
      newPerson.cpf = this.peopleUtils.changeCpf(newPerson.cpf)
      return newPerson
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível criar a pessoa',
        'service/createPerson'
      )
    }
  }

  async findAllPeople() {
    try {
      const allPeople = await this.peopleRepository.findAllPeople()
      allPeople.forEach((person) => {
        person.cpf = this.peopleUtils.changeCpf(person.cpf)
      })
      return allPeople
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar todas as pessoas.',
        'service/findAllPeople'
      )
    }
  }

  async findPersonById(id: number) {
    try {
      const person = await this.peopleRepository.findPersonById(id)
      person.cpf = this.peopleUtils.changeCpf(person.cpf)
      return person
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar a pessoa.',
        'service/findPersonById'
      )
    }
  }

  async updatePersonById(updatePersonDto: UpdatePersonDto): Promise<Person> {
    try {
      const updatePersonData =
        this.peopleUtils.newUpdatePersonData(updatePersonDto)
      const person =
        await this.peopleRepository.updatePersonById(updatePersonData)
      person.cpf = this.peopleUtils.changeCpf(person.cpf)
      return person
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível atualizar a pessoa.',
        'service/updatePersonById'
      )
    }
  }

  async deletePersonById(id: number): Promise<void> {
    try {
      await this.peopleRepository.deletePersonById(id)
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível atualizar a pessoa.',
        'service/deletePerson'
      )
    }
  }
}
