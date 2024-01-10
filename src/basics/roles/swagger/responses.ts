import { ApiProperty } from '@nestjs/swagger'
import { IRole } from '../types'

export class Role implements IRole {
  @ApiProperty()
  roleDescription: string

  @ApiProperty()
  roleId: number

  @ApiProperty()
  roleName: string
}
