import { Test, TestingModule } from '@nestjs/testing'
import { TermsTypesController } from '../terms-types.controller'
import { TermsTypesService } from '../terms-types.service'
import * as fillers from './fillers'
import { ErrorsService } from 'src/shared/utils/errors.service'
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

describe('TermsTypesController', () => {
  let termsTypesController: TermsTypesController
  let mockTermsTypesService: TermsTypesService
  let mockErrosService: ErrorsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermsTypesController],
      providers: [
        TermsTypesService,
        {
          provide: ErrorsService,
          useValue: {
            handleErrors: jest
              .fn()
              .mockReturnValue(new InternalServerErrorException())
          }
        },
        {
          provide: TermsTypesService,
          useValue: {
            createTermType: jest.fn().mockResolvedValue(fillers.termType1),
            findTermTypeById: jest.fn().mockResolvedValue(fillers.termType1),
            findAllTermsTypes: jest.fn().mockResolvedValue(fillers.termsTypes),
            updateTermTypeById: jest
              .fn()
              .mockResolvedValue(fillers.termType1Updated),
            deleteTermTypeById: jest.fn().mockResolvedValue(undefined)
          }
        }
      ]
    }).compile()

    termsTypesController =
      module.get<TermsTypesController>(TermsTypesController)
    mockTermsTypesService = module.get<TermsTypesService>(TermsTypesService)
    mockErrosService = module.get<ErrorsService>(ErrorsService)
  })

  it('should be defined', () => {
    expect(termsTypesController).toBeDefined()
  })

  describe('createTermType', () => {
    it('should be defined', () => {
      expect(termsTypesController.createTermType).toBeDefined()
    })

    it('should return a new term type', async () => {
      //Act
      const result = await termsTypesController.createTermType(
        fillers.createTermTypeDto
      )

      expect(result).toEqual(fillers.termType1)
      expect(mockTermsTypesService.createTermType).toHaveBeenCalledTimes(1)
    })

    it('should throw an error', async () => {
      //Arrange
      jest
        .spyOn(mockTermsTypesService, 'createTermType')
        .mockRejectedValueOnce(new BadRequestException())

      jest
        .spyOn(mockErrosService, 'handleErrors')
        .mockReturnValueOnce(new BadRequestException())

      //Assert
      expect(
        termsTypesController.createTermType(fillers.createTermTypeDto)
      ).rejects.toThrow(BadRequestException)
    })
  })

  describe('findAllTermsTypes', () => {
    it('should be defined', () => {
      expect(termsTypesController.findAllTermsTypes).toBeDefined()
    })

    it('should return all terms types', async () => {
      //Act
      const result = await termsTypesController.findAllTermsTypes()

      expect(result).toEqual(fillers.termsTypes)
      expect(mockTermsTypesService.findAllTermsTypes).toHaveBeenCalledTimes(1)
    })

    it('should throw an error', async () => {
      //Arrange
      jest
        .spyOn(mockTermsTypesService, 'findAllTermsTypes')
        .mockRejectedValueOnce(new NotFoundException())

      jest
        .spyOn(mockErrosService, 'handleErrors')
        .mockReturnValueOnce(new NotFoundException())

      //Assert
      expect(termsTypesController.findAllTermsTypes()).rejects.toThrow(
        NotFoundException
      )
    })
  })

  describe('findTermTypeById', () => {
    it('should be defined', () => {
      expect(termsTypesController.findTermTypeById).toBeDefined()
    })

    it('should return a term type', async () => {
      //Act
      const result = await termsTypesController.findTermTypeById('1')

      expect(result).toEqual(fillers.termType1)
      expect(mockTermsTypesService.findTermTypeById).toHaveBeenCalledTimes(1)
    })

    it('should throw an error', async () => {
      //Arrange
      jest
        .spyOn(mockTermsTypesService, 'findTermTypeById')
        .mockRejectedValueOnce(new NotFoundException())

      jest
        .spyOn(mockErrosService, 'handleErrors')
        .mockReturnValueOnce(new NotFoundException())

      //Assert
      expect(termsTypesController.findTermTypeById('1')).rejects.toThrow(
        NotFoundException
      )
    })
  })

  describe('updateTermTypeById', () => {
    it('should be defined', () => {
      expect(termsTypesController.updateTermTypeById).toBeDefined()
    })

    it('should return an updated term type', async () => {
      //Act
      const result = await termsTypesController.updateTermTypeById(
        fillers.updateTermTypeDto
      )

      expect(result).toEqual(fillers.termType1Updated)
      expect(mockTermsTypesService.updateTermTypeById).toHaveBeenCalledTimes(1)
    })

    it('should throw an error', async () => {
      //Arrange
      jest
        .spyOn(mockTermsTypesService, 'updateTermTypeById')
        .mockRejectedValueOnce(new NotFoundException())

      jest
        .spyOn(mockErrosService, 'handleErrors')
        .mockReturnValueOnce(new NotFoundException())

      //Assert
      expect(
        termsTypesController.updateTermTypeById(fillers.updateTermTypeDto)
      ).rejects.toThrow(NotFoundException)
    })
  })
})
