import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import { IRole } from './types'
import { ErrorsService } from 'src/shared/utils/errors.service'

@Injectable()
export class RolesRepository {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private errorsService: ErrorsService
  ) {}

  async findAllRoles() {
    try {
      const rolesConsult = await this.knex('roles').select('*')
      return rolesConsult
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar todas as pessoas',
        'repository/findAllRoles'
      )
    }
  }

  async findRoleById(id: number): Promise<IRole> {
    try {
      const rolesConsult = await this.knex('roles')
        .first('*')
        .where('role_id', id)

      if (!rolesConsult) {
        throw new NotFoundException('#Papel não encontrado.')
      }

      return rolesConsult
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar a pessoa',
        'repository/findRoleById'
      )
    }
  }
}
