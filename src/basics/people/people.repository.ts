import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import { ICreatePersonData, IUpdatePersonData, Person } from './types'
import { PeopleUtils } from './people.utils'
import { ErrorsService } from 'src/shared/errors/errors.service'

@Injectable()
export class PeopleRepository {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private peopleUtils: PeopleUtils,
    private errorsService: ErrorsService
  ) {}

  async createPerson(createPersonData: ICreatePersonData): Promise<Person> {
    try {
      const [personId] = await this.knex('people').insert(createPersonData)
      const person = await this.findPersonById(personId)
      return person
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi pode criar a pessoa',
        'repository/createPerson'
      )
    }
  }

  async findAllPeople() {
    try {
      const peopleConsult = await this.knex('people').select('*')
      if (peopleConsult.length === 0) {
        throw new NotFoundException('#Nenhuma pessoa encontrada')
      }
      //cria uma array de Person a partir da consulta no db
      const allPeople: Person[] =
        this.peopleUtils.createPeopleArray(peopleConsult)
      return allPeople
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar todas as pessoas',
        'repository/findAllPeople'
      )
    }
  }

  async findPersonById(id: number): Promise<Person> {
    try {
      const peopleConsult = await this.knex('people')
        .first('*')
        .where('person_id', id)

      if (!peopleConsult) {
        throw new Error('0')
      }
      //cria uma pessoa a partir da consulta no db
      const person: Person = this.peopleUtils.createPerson(peopleConsult)

      return person
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar a pessoa',
        'repository/findPersonById'
      )
    }
  }

  async updatePersonById(updatePersonData: IUpdatePersonData): Promise<Person> {
    try {
      await this.knex('people')
        .update(updatePersonData)
        .where('person_id', updatePersonData.personId)
      const person = await this.findPersonById(updatePersonData.personId)
      return person
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível atualizar a pessoa',
        'repository/updatePersonById'
      )
    }
  }

  async deletePerson(id: number): Promise<void> {
    try {
      await this.knex('people').delete().where('person_id', id)
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível deletar a pessoa',
        'repository/deletePerson'
      )
    }
  }
}
