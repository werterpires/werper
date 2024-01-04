import { ApiProperty } from '@nestjs/swagger'
import {
  Equals,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  maxLength
} from 'class-validator'

export class CreatePersonDto {
  @IsString()
  @ApiProperty()
  name: string

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  surname?: string | null

  @IsIn(['f', 'j'])
  @ApiProperty({ format: '"f" | "j"' })
  personType: 'f' | 'j'

  @IsOptional()
  @IsString()
  @Length(11, 11)
  @ApiProperty({ required: false, maxLength: 11, minLength: 11 })
  cpf?: string | null

  @IsOptional()
  @IsString()
  @Length(14, 14)
  @ApiProperty({ required: false, maxLength: 14, minLength: 14 })
  cnpj?: string | null

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    format: 'mm/dd/yyyy',
    example: '12/31/2023'
  })
  birthDate?: string | null

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  address?: string | null

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  number?: string | null

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  city?: string | null

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  state?: string | null

  @IsOptional()
  @IsString()
  @Length(8, 8)
  @ApiProperty({ required: false, maxLength: 8, minLength: 8 })
  zipCode?: string | null

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  complement?: string | null

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  neighborhood?: string | null

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  email?: string | null

  @IsOptional()
  @IsString()
  // @MaxLength(16)
  @ApiProperty({ required: false })
  phone?: string | null

  @IsOptional()
  @IsString()
  // @MaxLength(16)
  @ApiProperty({
    required: false
  })
  cellphone?: string | null
}
