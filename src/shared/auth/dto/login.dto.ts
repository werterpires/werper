import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @ApiProperty()
  password: string
}
