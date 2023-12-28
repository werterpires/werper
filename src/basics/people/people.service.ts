import { Injectable } from '@nestjs/common'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { PeopleUtils } from './people.utils'
import { ErrorsService } from 'src/shared/errors/errors.service'
import { PeopleRepository } from './people.repository'
import { Person } from './types'

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
      return newPerson
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível criar a pessoa',
        'service/createPerson'
      )
    }
  }

  findAllPeople() {
    try {
      const allPeople = this.peopleRepository.findAllPeople()
      return allPeople
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar todas as pessoas.',
        'service/findAllPeople'
      )
    }
  }

  findPersonById(id: number) {
    try {
      const person = this.peopleRepository.findPersonById(id)
      return person
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar a pessoa.',
        'service/findPersonById'
      )
    }
  }

  async updatePersonById(
    id: number,
    updatePersonDto: UpdatePersonDto
  ): Promise<Person> {
    try {
      const updatePersonData =
        this.peopleUtils.newUpdatePersonData(updatePersonDto)
      const person =
        await this.peopleRepository.updatePersonById(updatePersonData)
      return person
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível atualizar a pessoa.',
        'service/updatePersonById'
      )
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.peopleRepository.deletePerson(id)
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível atualizar a pessoa.',
        'service/updatePersonById'
      )
    }
  }
}
