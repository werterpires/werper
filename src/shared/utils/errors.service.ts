import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { ErrorsUtils } from './errors.utils'

@Injectable()
export class ErrorsService {
  constructor(private readonly errorsUtils: ErrorsUtils) {}
  handleErrors(error: any, message: string, func: string): any {
    // console.error(error)
    if (error.message.startsWith('#')) {
      return error
    } else if (error.code === 'ER_TRUNCATED_WRONG_VALUE') {
      const problem = this.errorsUtils.getProblematicEntry(error.sqlMessage)
      return new BadRequestException(
        `#O dado '${problem}' não está num formato aceitável.`
      )
    } else if (error.code == 'ER_DUP_ENTRY') {
      const problem = this.errorsUtils.getProblematicEntry(error.sqlMessage)
      return new BadRequestException(
        `#Já existe um registro com o seguinte dado: '${problem}' e ele deve ser único.`
      )
    } else {
      console.error(`new error in  ${func}:`)
      console.error(error)
      const errMsg = message
      return new InternalServerErrorException(errMsg)
    }
  }
}
