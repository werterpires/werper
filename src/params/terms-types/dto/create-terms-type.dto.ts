import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateTermsTypeDto {
  @IsString()
  @ApiProperty()
  termTypeName: string

  @IsString()
  @ApiProperty()
  termTypeDescription: string
}
