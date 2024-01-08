import { Injectable } from '@nestjs/common'
import { CreateTermsTypeDto } from './dto/create-terms-type.dto'
import { UpdateTermsTypeDto } from './dto/update-terms-type.dto'
import { TermsTypesRepository } from './terms-types.repository'
import { ITermType } from './types'
import { ErrorsService } from 'src/shared/utils/errors.service'
import { TermsTypesUtils } from './terms-types.utils'

@Injectable()
export class TermsTypesService {
  constructor(
    private readonly termstypesRepository: TermsTypesRepository,
    private readonly errorsService: ErrorsService,
    private readonly termsTypesUtils: TermsTypesUtils
  ) {}
  async createTermType(
    createTermTypeDto: CreateTermsTypeDto
  ): Promise<ITermType> {
    try {
      const createTermTypeData = { ...createTermTypeDto }

      const termTypeId =
        await this.termstypesRepository.createTermType(createTermTypeData)

      const newTermTypeData =
        await this.termstypesRepository.findTermTypeById(termTypeId)

      const newTermType =
        this.termsTypesUtils.createTermTypeFromDB(newTermTypeData)

      return newTermType
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        'Falha ao criar tipo de termo',
        'service/createTermType'
      )
    }
  }

  async findAllTermsTypes(): Promise<ITermType[]> {
    try {
      const termsTypesData = await this.termstypesRepository.findAllTermsTypes()

      const termsTypes =
        this.termsTypesUtils.createTermsTypesArrayFromDB(termsTypesData)

      return termsTypes
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        'Falha ao buscar tipos de termo',
        'service/findAllTermsTypes'
      )
    }
  }

  async findTermTypeById(id: number): Promise<ITermType> {
    try {
      const termTypeData = await this.termstypesRepository.findTermTypeById(id)

      const termType = this.termsTypesUtils.createTermTypeFromDB(termTypeData)

      return termType
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        'Falha ao buscar tipo de termo',
        'service/findTermTypeById'
      )
    }
  }

  async updateTermTypeById(
    updateTermTypeDto: UpdateTermsTypeDto
  ): Promise<ITermType> {
    try {
      const updateTermTypeData = { ...updateTermTypeDto }
      const termTypeId =
        await this.termstypesRepository.updateTermTypeById(updateTermTypeData)
      const updatedTermTypeData =
        await this.termstypesRepository.findTermTypeById(
          updateTermTypeData.termTypeId
        )
      const updatedTermType =
        this.termsTypesUtils.createTermTypeFromDB(updatedTermTypeData)
      return updatedTermType
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        'Falha ao atualizar tipo de termo',
        'service/updateTermTypeById'
      )
    }
  }

  async deleteTermTypeById(id: number): Promise<void> {
    try {
      await this.termstypesRepository.deleteTermTypeById(id)
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        'Falha ao deletar tipo de termo',
        'service/deleteTermTypeById'
      )
    }
  }
}
