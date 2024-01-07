import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateTermsTypeDto } from './create-terms-type.dto'
import { IsNumber, IsString } from 'class-validator'

export class UpdateTermsTypeDto extends PartialType(CreateTermsTypeDto) {
  @IsNumber()
  @ApiProperty()
  termTypeId: number

  @ApiProperty()
  @IsString()
  termTypeName?: string

  @IsString()
  @ApiProperty()
  termTypeDescription?: string
}
