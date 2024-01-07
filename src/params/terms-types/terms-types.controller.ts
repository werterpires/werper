import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put
} from '@nestjs/common'
import { TermsTypesService } from './terms-types.service'
import { CreateTermsTypeDto } from './dto/create-terms-type.dto'
import { UpdateTermsTypeDto } from './dto/update-terms-type.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TermType } from './swagger/responses'
import { ErrorsService } from 'src/shared/utils/errors.service'

@Controller('terms-types')
@ApiTags('Terms Types')
export class TermsTypesController {
  constructor(
    private readonly termsTypesService: TermsTypesService,
    private readonly errorsService: ErrorsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'create a new terms type.' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TermType
  })
  @ApiResponse({})
  async createTermType(@Body() createTermsTypeDto: CreateTermsTypeDto) {
    try {
      const newTermType =
        await this.termsTypesService.createTermType(createTermsTypeDto)

      return newTermType
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        'Falha ao criar tipo de termo',
        'controller/createTermType'
      )
    }
  }

  @Get()
  async findAllTermsTypes() {
    try {
      const termTypes = await this.termsTypesService.findAllTermsTypes()
      return termTypes
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        'Falha ao buscar tipos de termo',
        'controller/findAllTermsTypes'
      )
    }
  }

  @Get(':id')
  async findTermTypeById(@Param('id') id: string) {
    try {
      const termType = await this.termsTypesService.findTermTypeById(+id)

      return termType
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        'Falha ao buscar tipo de termo',
        'controller/findTermTypeById'
      )
    }
  }

  @Put()
  async updateTermTypeById(@Body() updateTermsTypeDto: UpdateTermsTypeDto) {
    try {
      const updatedTerm =
        await this.termsTypesService.updateTermTypeById(updateTermsTypeDto)

      return updatedTerm
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        'Falha ao atualizar tipo de termo',
        'controller/updateTermTypeById'
      )
    }
  }

  @Delete(':id')
  async deleteTermTypeById(@Param('id') id: string) {
    try {
      return await this.termsTypesService.deleteTermTypeById(+id)
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        'Falha ao deletar tipo de termo',
        'controller/deleteTermTypeById'
      )
    }
  }
}
