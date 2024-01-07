import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  isArray
} from 'class-validator'
import { IOccupationPermission } from '../types'
import { CreatePersonDto } from 'src/basics/people/dto/create-person.dto'

export class CreateUserDto {
  @IsString()
  @Length(8, 16)
  @ApiProperty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'senha muito fraca'
  })
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

  @IsArray()
  @IsArray({ each: true })
  @ApiProperty()
  occupationsPermissions: IOccupationPermission[]

  @IsObject()
  @ApiProperty()
  companyPerson: CreatePersonDto
}
