import {
  Equals,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Length,
  MaxLength
} from 'class-validator'

export class CreatePersonDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  surname?: string | null

  @IsIn(['f', 'j'])
  personType: 'f' | 'j'

  @IsOptional()
  @IsString()
  @Length(11, 11)
  cpf?: string | null

  @IsOptional()
  @IsString()
  @Length(14, 14)
  cnpj?: string | null

  @IsOptional()
  @IsString()
  birthDate?: string | null

  @IsOptional()
  @IsString()
  address?: string | null

  @IsOptional()
  @IsString()
  number?: string | null

  @IsOptional()
  @IsString()
  city?: string | null

  @IsOptional()
  @IsString()
  state?: string | null

  @IsOptional()
  @IsString()
  @Length(8, 8)
  zipCode?: string | null

  @IsOptional()
  @IsString()
  complement?: string | null

  @IsOptional()
  @IsString()
  neighborhood?: string | null

  @IsOptional()
  @IsEmail()
  email?: string | null

  @IsOptional()
  @IsString()
  phone?: string | null

  @IsOptional()
  @IsString()
  cellphone?: string | null
}
