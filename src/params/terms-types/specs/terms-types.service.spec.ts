import { Test, TestingModule } from '@nestjs/testing'
import { TermsTypesService } from '../terms-types.service'
import { ICreateTermType } from '../types'
import * as fillers from './fillers'
import { TermsTypesRepository } from '../terms-types.repository'
import { ErrorsService } from 'src/shared/utils/errors.service'
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { TermsTypesUtils } from '../terms-types.utils'
import { UpdatePersonDto } from 'src/basics/people/dto/update-person.dto'
import { UpdateTermsTypeDto } from '../dto/update-terms-type.dto'

describe('TermsTypesService', () => {
  let termsTypesService: TermsTypesService
  let mockErrosService: ErrorsService
  let mockTermsTypesUtils: TermsTypesUtils
  let mockTermsTypesRepository: TermsTypesRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TermsTypesService,
        {
          provide: TermsTypesRepository,
          useValue: {
            createTermType: jest.fn().mockResolvedValue(1),
            findTermTypeById: jest
              .fn()
              .mockResolvedValue(fillers.termTypeConsult1),
            findAllTermsTypes: jest
              .fn()
              .mockResolvedValue(fillers.termsTypesConsult),
            updateTermTypeById: jest
              .fn()
              .mockResolvedValue(fillers.termType1Updated),
            deleteTermTypeById: jest.fn().mockResolvedValue(undefined)
          }
        },
        {
          provide: ErrorsService,
          useValue: {
            handleErrors: jest
              .fn()
              .mockReturnValue(
                new InternalServerErrorException(
                  '#Houve uma falha com a operação'
                )
              )
          }
        },
        {
          provide: TermsTypesUtils,
          useValue: {
            createTermTypeFromDB: jest.fn().mockReturnValue(fillers.termType1),
            createTermsTypesArrayFromDB: jest
              .fn()
              .mockReturnValue(fillers.termsTypes)
          }
        }
      ]
    }).compile()

    termsTypesService = module.get<TermsTypesService>(TermsTypesService)
    mockErrosService = module.get<ErrorsService>(ErrorsService)
    mockTermsTypesUtils = module.get<TermsTypesUtils>(TermsTypesUtils)
    mockTermsTypesRepository =
      module.get<TermsTypesRepository>(TermsTypesRepository)
  })

  it('should be defined', () => {
    expect(termsTypesService).toBeDefined()
  })

  describe('createTermType', () => {
    it('should create a new term type', async () => {
      // Arrange
      const createTermTypeDto: ICreateTermType = fillers.crateTermTypeDto
      const expected = fillers.termType1

      //Act
      const result = await termsTypesService.createTermType(createTermTypeDto)

      //Assert

      expect(mockTermsTypesRepository.createTermType).toHaveBeenCalledTimes(1)
      expect(mockTermsTypesRepository.findTermTypeById).toHaveBeenCalledTimes(1)
      expect(mockTermsTypesUtils.createTermTypeFromDB).toHaveBeenCalledTimes(1)
      expect(result).toEqual(expected)
    })

    it('should throw an error', async () => {
      //Arrange
      jest
        .spyOn(mockTermsTypesRepository, 'createTermType')
        .mockRejectedValueOnce(new InternalServerErrorException())

      //Assert
      expect(
        termsTypesService.createTermType(fillers.crateTermTypeDto)
      ).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('findAllTermsTypes', () => {
    it('should return a array of term types', async () => {
      // Arrange
      const expected = fillers.termsTypes
      // Act
      const result = await termsTypesService.findAllTermsTypes()
      // Assert
      expect(mockTermsTypesRepository.findAllTermsTypes).toHaveBeenCalledTimes(
        1
      )
      expect(
        mockTermsTypesUtils.createTermsTypesArrayFromDB
      ).toHaveBeenCalledTimes(1)
      expect(result).toEqual(expected)
    })

    it('should throw an error', async () => {
      // Arrange
      jest
        .spyOn(mockTermsTypesRepository, 'findAllTermsTypes')
        .mockRejectedValueOnce(new InternalServerErrorException())
      // Assert
      expect(termsTypesService.findAllTermsTypes()).rejects.toThrow(
        InternalServerErrorException
      )
    })
  })

  describe('findTermTypeById', () => {
    it('should return a term type', async () => {
      // Arrange
      const expected = fillers.termType1
      // Act
      const result = await termsTypesService.findTermTypeById(1)
      // Assert
      expect(mockTermsTypesRepository.findTermTypeById).toHaveBeenCalledTimes(1)
      expect(mockTermsTypesUtils.createTermTypeFromDB).toHaveBeenCalledTimes(1)
      expect(result).toEqual(expected)
    })

    it('should throw an error', async () => {
      // Arrange
      jest
        .spyOn(mockTermsTypesRepository, 'findTermTypeById')
        .mockRejectedValueOnce(new BadRequestException())

      jest
        .spyOn(mockErrosService, 'handleErrors')
        .mockReturnValue(new BadRequestException())
      // Assert
      expect(termsTypesService.findTermTypeById(1)).rejects.toThrow(
        BadRequestException
      )
    })
  })

  describe('updateTermTypeById', () => {
    it('should update a term type', async () => {
      // Arrange
      const updateTermTypeDto: UpdateTermsTypeDto = fillers.updateTermTypeDto
      const expected = fillers.termType1
      // Act
      const result =
        await termsTypesService.updateTermTypeById(updateTermTypeDto)
      // Assert
      expect(mockTermsTypesRepository.updateTermTypeById).toHaveBeenCalledTimes(
        1
      )
      expect(mockTermsTypesRepository.findTermTypeById).toHaveBeenCalledTimes(1)
      expect(mockTermsTypesUtils.createTermTypeFromDB).toHaveBeenCalledTimes(1)
      expect(result).toEqual(expected)
    })

    it('should throw an error', async () => {
      // Arrange
      jest
        .spyOn(mockTermsTypesRepository, 'updateTermTypeById')
        .mockRejectedValueOnce(new NotFoundException())

      jest
        .spyOn(mockErrosService, 'handleErrors')
        .mockReturnValue(new NotFoundException())
      // Assert
      expect(
        termsTypesService.updateTermTypeById(fillers.updateTermTypeDto)
      ).rejects.toThrow(NotFoundException)
    })
  })

  describe('deleteTermTypeById', () => {
    it('should delete a term type and return undefined', async () => {
      // Arrange
      const expected = undefined
      // Act
      const result = await termsTypesService.deleteTermTypeById(1)
      // Assert
      expect(mockTermsTypesRepository.deleteTermTypeById).toHaveBeenCalledTimes(
        1
      )
      expect(result).toEqual(expected)
    })

    it('should throw an error', async () => {
      // Arrange
      jest
        .spyOn(mockTermsTypesRepository, 'deleteTermTypeById')
        .mockRejectedValueOnce(new NotFoundException())

      jest
        .spyOn(mockErrosService, 'handleErrors')
        .mockReturnValue(new NotFoundException())
      // Assert
      expect(termsTypesService.deleteTermTypeById(1)).rejects.toThrow(
        NotFoundException
      )
    })
  })
})
