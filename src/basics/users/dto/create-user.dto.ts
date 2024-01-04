import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Length
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @Length(8, 16)
  @ApiProperty()
  password: string

  @IsBoolean()
  @ApiProperty()
  active: boolean

  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  @ApiProperty()
  surname: string

  @IsString()
  @Length(11, 11)
  @ApiProperty()
  cpf: string

  @IsIn(['f'])
  @ApiProperty()
  personType: 'f'

  @IsEmail()
  @ApiProperty()
  email: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  phone?: string

  @IsString()
  @ApiProperty()
  cellphone: string
}
