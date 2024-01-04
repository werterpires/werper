import { ApiProperty, PartialType } from '@nestjs/swagger'
import {
  IsBoolean,
  IsNumber,
  IsString,
  Length
} from 'class-validator/types/decorator/decorators'

export class UpdateUserPasswordDto {
  @IsString()
  @Length(8, 16)
  @ApiProperty()
  password: string

  @IsNumber()
  @ApiProperty()
  userId: number
}

export class UpdateUserActivityDto {
  @IsNumber()
  @ApiProperty()
  userId: number

  @IsBoolean()
  @ApiProperty()
  active: boolean
}
