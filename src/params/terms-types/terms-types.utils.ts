import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { ICreateTermType, ITermType } from './types'
import { CreateTermsTypeDto } from './dto/create-terms-type.dto'

@Injectable()
export class TermsTypesUtils {
  createTermsTypesArrayFromDB(consultResult: any[]): ITermType[] {
    const termsTypes: ITermType[] = consultResult.map((termType) => {
      return this.newTermType(
        termType.term_type_description,
        termType.term_type_id,
        termType.term_type_name
      )
    })

    termsTypes.forEach((person) => {
      for (let prop of Object.entries(person)) {
        if (prop[1] === undefined) {
          throw new InternalServerErrorException(
            `Propriedade ${prop[0]} não foi encontrada`
          )
        }
      }
    })
    return termsTypes
  }
  createTermTypeFromDB(consultResult: any): ITermType {
    const termType = this.newTermType(
      consultResult.term_type_description,
      consultResult.term_type_id,
      consultResult.term_type_name
    )
    for (let prop of Object.entries(termType)) {
      if (prop[1] === undefined) {
        throw new InternalServerErrorException(
          `#Propriedade ${prop[0]} não foi encontrada`
        )
      }
    }
    return termType
  }
  newTermType(
    termTypeDescription: string,
    termTypeId: number,
    termTypeName: string
  ): ITermType {
    return {
      termTypeDescription,
      termTypeId,
      termTypeName
    }
  }
}
