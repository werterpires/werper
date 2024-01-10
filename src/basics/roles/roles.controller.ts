import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { ErrorsService } from 'src/shared/utils/errors.service'

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly errosService: ErrorsService
  ) {}

  @Get()
  findAllRoles() {
    try {
      const roles = this.rolesService.findAllRoles()
      return roles
    } catch (error) {
      throw this.errosService.handleErrors(
        error,
        '#Não foi possível buscar todas os Papeis',
        'controller/findAllRoles'
      )
    }
  }

  @Get(':id')
  findRoleById(@Param('id') id: string) {
    try {
      const role = this.rolesService.findRoleById(+id)
      return role
    } catch (error) {
      throw this.errosService.handleErrors(
        error,
        '#Não foi possível encontrar o Papel',
        'controller/findRoleById'
      )
    }
  }
}
