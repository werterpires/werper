import { Injectable } from '@nestjs/common'
import { RolesUtils } from './roles.utils'
import { RolesRepository } from './roles.repository'
import { ErrorsService } from 'src/shared/utils/errors.service'

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesUtils: RolesUtils,
    private readonly rolesRepository: RolesRepository,
    private readonly errorService: ErrorsService
  ) {}

  async findAllRoles() {
    try {
      const rolesData = await this.rolesRepository.findAllRoles()
      const roles = this.rolesUtils.createRolesArrayFromDB(rolesData)
      return roles
    } catch (error) {
      throw this.errorService.handleErrors(
        error,
        '#Não foi possível buscar todas os Papeis',
        'service/findAllRoles'
      )
    }
  }

  async findRoleById(id: number) {
    try {
      const role = this.rolesUtils.createRoleFromDB(
        await this.rolesRepository.findRoleById(id)
      )
      return role
    } catch (error) {
      throw this.errorService.handleErrors(
        error,
        '#Não foi possível encontrar o Papel',
        'service/findRoleById'
      )
    }
  }
}
