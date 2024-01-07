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
  ICreateSignerUser,
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

  async createSignerUser(createUserData: ICreateSignerUser): Promise<number> {
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
        cellphone,
        occupationsPermissions,
        roles,
        subscriptionTitle,
        subscriptionActive,
        subscriptionHistoric,
        companiesNumber,
        price,
        companyPerson,
        companyDescription,
        logged,
        validate,
        usersNumber
      } = createUserData

      let userId: number | null

      await this.knex.transaction(async (trx) => {
        const personId = await trx('people').insert({
          name,
          surname,
          person_type: personType,
          cpf,
          email,
          phone,
          cellphone
        })

        userId = (
          await trx('users').insert({
            person_id: personId[0],
            password_hash: passwordHash,
            active
          })
        )[0]

        const userUtilityId = await trx('users_utilities').insert({
          user_id: userId,
          logged
        })

        const userRoleId = await trx('users_roles').insert({
          user_id: userId,
          role_id: roles[0]
        })

        for (let occupationPermission of occupationsPermissions) {
          await trx('users_occupations_permissions').insert({
            user_id: userId,
            occupation_id: occupationPermission.occupationId,
            permission_id: occupationPermission.permissionId
          })
        }

        const subscriptionId = await trx('subscriptions').insert({
          subscription_title: subscriptionTitle,
          subscription_active: subscriptionActive,
          validate
        })

        const subscriptionConfigurationId = await trx(
          'subscription_configurations'
        ).insert({
          subscription_id: subscriptionId[0],
          companies_number: companiesNumber,
          price,
          subscription_historic: subscriptionHistoric,
          users_number: usersNumber
        })

        const companypersonId = await trx('people').insert({
          name: companyPerson.name,
          surname: companyPerson.surname,
          person_type: companyPerson.personType,
          cpf: companyPerson.cpf,
          cnpj: companyPerson.cnpj,
          birth_date: companyPerson.birthDate,
          address: companyPerson.address,
          number: companyPerson.number,
          city: companyPerson.city,
          state: companyPerson.state,
          zip_code: companyPerson.zipCode,
          complement: companyPerson.complement,
          neighborhood: companyPerson.neighborhood,
          email: companyPerson.email,
          phone: companyPerson.phone,
          cellphone: companyPerson.cellphone
        })

        await trx('companies').insert({
          subscription_id: subscriptionId,
          person_id: companypersonId,
          company_description: companyDescription
        })

        if (!userId) {
          await trx.rollback()
        } else {
          await trx.commit()
        }
      })

      if (!userId) {
        throw new InternalServerErrorException(
          '#Usuário criado, mas não foi possível recuperá-lo do banco de dados.'
        )
      }

      return userId
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

      return usersConsult
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar todos os usuários',
        'repository/findAllUsers'
      )
    }
  }

  async findUserById(id: number): Promise<any> {
    try {
      const usersConsult = await this.knex('users')
        .leftJoin('people', 'users.person_id', 'people.person_id')
        .first('*')
        .where('user_id', id)

      if (!usersConsult) {
        throw new NotFoundException('#Usuário não encontrado.')
      }

      return usersConsult
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível encontrar o usuário',
        'repository/findUserById'
      )
    }
  }

  async findUserByEmail(email: string): Promise<any> {
    try {
      const usersConsult = await this.knex('users')
        .join('people', 'users.person_id', 'people.person_id')
        .first('*')
        .where('people.email', email)

      if (!usersConsult) {
        throw new NotFoundException('#Usuário não encontrado.')
      }

      return usersConsult
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível encontrar o usuário',
        'repository/findUserByEmail'
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
