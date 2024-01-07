export interface ICreateTermType {
  termTypeName: string
  termTypeDescription: string
}

export interface ITermType {
  termTypeId: number
  termTypeName: string
  termTypeDescription: string
}

export interface IUpdateTermType {
  termTypeId: number
  termTypeName?: string
  termTypeDescription?: string
}
