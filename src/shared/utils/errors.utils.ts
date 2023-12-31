import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

@Injectable()
export class ErrorsUtils {
  getProblematicEntry(message: string) {
    const getProblematicEntry = message.match(/'([^']+)'/) || []

    return getProblematicEntry[1]
  }
}
