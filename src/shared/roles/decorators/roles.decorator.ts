import { SetMetadata } from '@nestjs/common'
import { ERoles } from '../types'

export const Roles = (...roles: ERoles[]) => SetMetadata('roles', roles)
