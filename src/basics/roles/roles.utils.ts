import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { IRole } from './types'
import { ValidatesService } from 'src/shared/utils/validates.service'

@Injectable()
export class RolesUtils {
  constructor(private readonly validatesService: ValidatesService) {}

  newRole(roleId: number, roleName: string, roleDescription: string): IRole {
    return {
      roleId,
      roleName,
      roleDescription
    }
  }

  createRolesArrayFromDB(consultResult: any[]): IRole[] {
    const roles: IRole[] = consultResult.map((role) => {
      return this.newRole(role.role_id, role.role_name, role.role_description)
    })

    roles.forEach((role) => {
      for (let prop of Object.entries(role)) {
        if (prop[1] === undefined) {
          throw new InternalServerErrorException(
            `Propriedade ${prop[0]} não foi encontrada`
          )
        }
      }
    })

    return roles
  }

  createRoleFromDB(consultResult: any): IRole {
    const role = this.newRole(
      consultResult.role_id,
      consultResult.role_name,
      consultResult.role_description
    )

    for (let prop of Object.entries(role)) {
      if (prop[1] === undefined) {
        throw new InternalServerErrorException(
          `Propriedade ${prop[0]} não foi encontrada`
        )
      }
    }

    return role
  }
}
