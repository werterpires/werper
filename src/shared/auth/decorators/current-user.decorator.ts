import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { IUser } from 'src/basics/users/types'
import { AuthRequest } from '../types'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IUser => {
    const request = context.switchToHttp().getRequest<AuthRequest>()

    return request.user
  }
)
