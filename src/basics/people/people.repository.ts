import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import { ICreatePersonData, IUpdatePersonData, Person } from './types'
import { PeopleUtils } from './people.utils'
import { ErrorsService } from 'src/shared/utils/errors.service'

@Injectable()
export class PeopleRepository {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private peopleUtils: PeopleUtils,
    private errorsService: ErrorsService
  ) {}

  async createPerson(createPersonData: ICreatePersonData): Promise<Person> {
    try {
      const {
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
      } = createPersonData

      const [personId] = await this.knex('people').insert({
        name,
        surname,
        person_type: personType,
        cpf,
        cnpj,
        birth_date: birthDate,
        address,
        number,
        city,
        state,
        zip_code: zipCode,
        complement,
        neighborhood,
        email,
        phone,
        cellphone
      })

      const person = await this.findPersonById(personId)

      return person
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível criar a pessoa',
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
        this.peopleUtils.createPeopleArrayFromDB(peopleConsult)
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
        throw new NotFoundException('#Pessoa não encontrada.')
      }

      //cria uma pessoa a partir da consulta no db
      const person: Person = this.peopleUtils.createPersonFromDB(peopleConsult)

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
      const {
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
        cellphone,
        updatedAt
      } = updatePersonData
      const editsQuantity = await this.knex('people')
        .update({
          name,
          surname,
          person_type: personType,
          cpf,
          cnpj,
          birth_date: birthDate,
          address,
          number,
          city,
          state,
          zip_code: zipCode,
          complement,
          neighborhood,
          email,
          phone,
          cellphone,
          updated_at: updatedAt
        })
        .where('person_id', updatePersonData.personId)
      if (editsQuantity === 0) {
        throw new NotFoundException('#Pessoa não encontrada.')
      }
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

  async deletePersonById(id: number): Promise<void> {
    try {
      const deletesQuantity = await this.knex('people')
        .delete()
        .where('person_id', id)

      if (deletesQuantity === 0) {
        throw new NotFoundException('#Pessoa não encontrada.')
      }
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível deletar a pessoa',
        'repository/deletePerson'
      )
    }
  }
}
