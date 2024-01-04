import { IPerson } from '../people/types'

export interface ICreateUser {
  passwordHash: string
  active: boolean
  name: string
  surname: string
  cpf: string
  personType: 'f'
  email: string
  phone: string | null
  cellphone: string
}

export interface IUser {
  userId: number
  personId: number
  passwordHash: string
  active: boolean
  person: IPerson
}

export interface IUpdateUserPassword {
  userId: number
  passwordHash: string
}

export interface IUpdateUserActivity {
  userId: number
  active: boolean
}
