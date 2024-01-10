import { ERoles } from 'src/shared/roles/types'

import { ICreatePerson, IPerson } from '../people/types'

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
  occupationsPermissions: IOccupationPermission[]
  roles: number[]
}

export interface ICreateSignerUser extends ICreateUser {
  subscriptionTitle: string
  subscriptionActive: boolean
  subscriptionHistoric: string
  companiesNumber: number
  usersNumber: number
  price: number
  companyPerson: ICreatePerson
  companyDescription: string
  logged: boolean
  validate: Date
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

// ---------------------------------------------------------------
export interface IRole {
  roleId: number
  role_name: string
  role_description: string
}
// ---------------------------------------------

export interface IOccupationPermission {
  occupationId: number
  permissionId: number
}

export interface ICreateCompany {
  person: ICreatePerson
}
