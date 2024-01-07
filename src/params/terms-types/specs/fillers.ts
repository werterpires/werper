import { CreateTermsTypeDto } from '../dto/create-terms-type.dto'
import { UpdateTermsTypeDto } from '../dto/update-terms-type.dto'
import { ICreateTermType, ITermType } from '../types'

//------------ consultas banco de dados --------------
export const termTypeConsult1 = {
  term_type_id: 1,
  term_type_name: 'Term type 1',
  term_type_description: 'Term type 1 description'
}

export const termTypeConsult2 = {
  term_type_id: 2,
  term_type_name: 'Term type 2',
  term_type_description: 'Term type 2 description'
}

export const termTypeConsultWUndefined = {
  term_type_id: 3,

  term_type_description: 'Term type 3 description'
}

export const termsTypesConsult = [termTypeConsult1, termTypeConsult2]

export const termsTypesConsultWUndefined = [
  termTypeConsult1,
  termTypeConsultWUndefined,
  termTypeConsult2
]

// ---------------- objetos prontos ----------------
export const termType1: ITermType = {
  termTypeId: 1,
  termTypeName: 'Term type 1',
  termTypeDescription: 'Term type 1 description'
}

export const termType1Updated: ITermType = {
  termTypeId: 1,
  termTypeName: 'Term type 10',
  termTypeDescription: 'Term type 10 description'
}

export const termType2: ITermType = {
  termTypeId: 2,
  termTypeName: 'Term type 2',
  termTypeDescription: 'Term type 2 description'
}

export const termsTypes: ITermType[] = [termType1, termType2]

// ---------------- Dto ----------------
export const crateTermTypeDto: CreateTermsTypeDto = {
  termTypeName: 'Term type 1',
  termTypeDescription: 'Term type 1 description'
}

export const updateTermTypeDto: UpdateTermsTypeDto = {
  termTypeId: 1,
  termTypeName: 'Term type 10',
  termTypeDescription: 'Term type 10 description'
}

// ---------------- creationData ----------------
export const createTermTypeData: ICreateTermType = {
  termTypeName: 'Term type 1',
  termTypeDescription: 'Term type 1 description'
}
