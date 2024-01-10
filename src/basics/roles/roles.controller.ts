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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Role } from './swagger/responses'
import { IsPublic } from 'src/shared/auth/decorators/is-public.decorator'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly errosService: ErrorsService
  ) {}
  @ApiOperation({
    summary: 'find all roles in data base'
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Role,
    isArray: true
  })
  @IsPublic()
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

  @ApiOperation({ summary: 'find the role with the infomed id' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Role
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @IsPublic()
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
