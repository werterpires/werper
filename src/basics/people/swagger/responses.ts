import { ApiProperty } from '@nestjs/swagger'
import { IPerson } from '../types'

export class Person implements IPerson {
  @ApiProperty()
  personId: number
  @ApiProperty()
  name: string
  @ApiProperty()
  surname: string | null
  @ApiProperty()
  personType: 'f' | 'j'
  @ApiProperty()
  cpf: string | null
  @ApiProperty()
  cnpj: string | null
  @ApiProperty()
  birthDate: string | null
  @ApiProperty()
  address: string | null
  @ApiProperty()
  number: string | null
  @ApiProperty()
  city: string | null
  @ApiProperty()
  state: string | null
  @ApiProperty()
  zipCode: string | null
  @ApiProperty()
  complement: string | null
  @ApiProperty()
  neighborhood: string | null
  @ApiProperty()
  email: string | null
  @ApiProperty()
  phone: string | null
  @ApiProperty()
  cellphone: string | null
}
