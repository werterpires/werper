import { PartialType } from '@nestjs/mapped-types'
import { CreatePersonDto } from './create-person.dto'
import { IsNumber } from 'class-validator'

export class UpdatePersonDto extends CreatePersonDto {
  @IsNumber()
  personId: number
}
