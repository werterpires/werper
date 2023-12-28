import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

@Injectable()
export class ErrorsService {
  handleErrors(error: any, message: string, func: string): any {
    if (error.message.startsWith('#')) {
      return error
    } else {
      console.error(`new error in  ${func}: ${error}`)
      const errMsg = message
      return new InternalServerErrorException(errMsg)
    }
  }
}
