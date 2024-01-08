export interface ICreateRole {
  name: string
  surname: string | null
  personType: 'f' | 'j'
  cpf: string | null
  cnpj: string | null
  birthDate: Date | null
  address: string | null
  number: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  complement: string | null
  neighborhood: string | null
  email: string | null
  phone: string | null
  cellphone: string | null
}
export interface IRole {
  personId: number
  name: string
  surname: string | null
  personType: 'f' | 'j'
  cpf: string | null
  cnpj: string | null
  birthDate: string | null
  address: string | null
  number: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  complement: string | null
  neighborhood: string | null
  email: string | null
  phone: string | null
  cellphone: string | null
}

export interface IUpdateRole {
  personId: number
  name?: string
  surname?: string | null
  personType?: 'f' | 'j'
  cpf?: string | null
  cnpj?: string | null
  birthDate?: Date | null
  address?: string | null
  number?: string | null
  city?: string | null
  state?: string | null
  zipCode?: string | null
  complement?: string | null
  neighborhood?: string | null
  email?: string | null
  phone?: string | null
  cellphone?: string | null
  updatedAt: Date
}
