import { PartialType } from '@nestjs/mapped-types'
import { CreatePersonDto } from './create-person.dto'
import { IsNumber } from 'class-validator'

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  @IsNumber()
  personId: number
}
