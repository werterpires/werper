import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'

import { UsersUtils } from './users.utils'
import { ErrorsService } from 'src/shared/utils/errors.service'
import {
  ICreateUser,
  IUpdateUserActivity,
  IUpdateUserPassword,
  IUser
} from './types'
import internal from 'stream'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private usersUtils: UsersUtils,
    private errorsService: ErrorsService
  ) {}

  async createUser(createUserData: ICreateUser): Promise<IUser> {
    try {
      const {
        passwordHash,
        active,
        name,
        surname,
        cpf,
        personType,
        email,
        phone,
        cellphone
      } = createUserData

      let userId: number | null

      await this.knex.transaction(async (trx) => {
        try {
          const personId = await trx('people').insert({
            name,
            surname,
            person_type: personType,
            cpf,
            email,
            phone,
            cellphone
          })

          userId = await trx('users').insert({
            person_id: personId[0],
            password_hash: passwordHash,
            active
          })
        } catch (error) {
          await trx.rollback()
          throw this.errorsService.handleErrors(
            error,
            '#Não foi possível criar o usuário',
            'repository/createUser'
          )
        }
      })

      if (!userId) {
        throw new InternalServerErrorException(
          '#Usuário criado, mas não foi possível recuperá-lo do banco de dados.'
        )
      }

      const user = await this.findUserById(userId)

      return user
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível criar o usuário',
        'repository/createUser'
      )
    }
  }

  async findAllUsers() {
    try {
      const usersConsult = await this.knex('users')
        .leftJoin('people', 'users.people_id', 'people.person_id')
        .select('*')

      //cria uma array de IUser a partir da consulta no db
      const allUsers: IUser[] =
        this.usersUtils.createUsersArrayFromDB(usersConsult)
      return allUsers
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar todos os usuários',
        'repository/findAllUsers'
      )
    }
  }

  async findUserById(id: number): Promise<IUser> {
    try {
      const usersConsult = await this.knex('users')
        .leftJoin('people', 'users.people_id', 'people.person_id')
        .first('*')
        .where('person_id', id)

      if (!usersConsult) {
        throw new NotFoundException('#Usuário não encontrado.')
      }

      //cria uma pessoa a partir da consulta no db
      const user: IUser = this.usersUtils.createUserFromDB(usersConsult)

      return user
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível encontrar o usuário',
        'repository/findUserById'
      )
    }
  }

  async updateUserActivityById(
    updateUserActivityData: IUpdateUserActivity
  ): Promise<IUser> {
    try {
      const { userId, active } = updateUserActivityData
      const editsQuantity = await this.knex('users')
        .update({
          active,
          updated_at: new Date()
        })
        .where('user_id', userId)
      if (editsQuantity === 0) {
        throw new NotFoundException('#Usuário não encontrado.')
      }
      const user = await this.findUserById(userId)
      return user
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível atualizar o usuário.',
        'repository/updateUserActivity'
      )
    }
  }

  async updateUserPasswordById(
    updateUserPasswordData: IUpdateUserPassword
  ): Promise<IUser> {
    try {
      const { userId, passwordHash } = updateUserPasswordData
      const editsQuantity = await this.knex('users')
        .update({
          password_hash: passwordHash,
          updated_at: new Date()
        })
        .where('user_id', userId)
      if (editsQuantity === 0) {
        throw new NotFoundException('#Usuário não encontrado.')
      }
      const user = await this.findUserById(userId)
      return user
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível atualizar o usuário.',
        'repository/updateUserPassword'
      )
    }
  }

  async deleteUserById(id: number): Promise<void> {
    try {
      const deletesQuantity = await this.knex('users')
        .delete()
        .where('user_id', id)

      if (deletesQuantity === 0) {
        throw new NotFoundException('#Usuário não encontrada.')
      }
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível deletar a pessoa',
        'repository/deleteUserById'
      )
    }
  }
}
