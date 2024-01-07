import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import { ErrorsService } from 'src/shared/utils/errors.service'
import { ICreateTermType, ITermType, IUpdateTermType } from './types'

@Injectable()
export class TermsTypesRepository {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private errorsService: ErrorsService
  ) {}

  async createTermType(createTermTypeData: ICreateTermType): Promise<number> {
    try {
      const { termTypeName, termTypeDescription } = createTermTypeData

      const [termTypeId] = await this.knex('terms_types').insert({
        term_type_name: termTypeName,
        term_type_description: termTypeDescription
      })

      return termTypeId
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível o tipo de erro',
        'repository/createTermType'
      )
    }
  }

  async findAllTermsTypes() {
    try {
      const termTypeConsult = await this.knex('terms_types').select('*')

      return termTypeConsult
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar todos os tipos de termo.',
        'repository/findAllTermsTypes'
      )
    }
  }

  async findTermTypeById(id: number): Promise<ITermType> {
    try {
      const termTypeConsult = await this.knex('terms_types')
        .first('*')
        .where('term_type_id', id)

      if (!termTypeConsult) {
        throw new NotFoundException('#Tipo de termo não encontrada.')
      }

      return termTypeConsult
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar o tipo de termo',
        'repository/findTermTypeById'
      )
    }
  }

  async updateTermTypeById(updateTermTypeData: IUpdateTermType): Promise<void> {
    try {
      const { termTypeId, termTypeDescription, termTypeName } =
        updateTermTypeData
      const editsQuantity = await this.knex('terms_types')
        .update({
          term_type_name: termTypeName,
          term_type_description: termTypeDescription
        })
        .where('term_type_id', termTypeId)
      if (editsQuantity === 0) {
        throw new NotFoundException('#Tipo de termo não encontrado.')
      }
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível atualizar o tipo de termo',
        'repository/updateTermTypeById'
      )
    }
  }

  async deleteTermTypeById(id: number): Promise<void> {
    try {
      const deletesQuantity = await this.knex('terms_types')
        .delete()
        .where('term_type_id', id)

      if (deletesQuantity === 0) {
        throw new NotFoundException('#Tipo de termo não encontrado.')
      }
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível deletar o tipo de termo',
        'repository/deleteTermType'
      )
    }
  }
}
