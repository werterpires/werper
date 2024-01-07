import { ApiProperty } from '@nestjs/swagger'
import { ITermType } from '../types'

export class TermType implements ITermType {
  @ApiProperty()
  termTypeId: number
  @ApiProperty()
  termTypeName: string
  @ApiProperty()
  termTypeDescription: string
}
