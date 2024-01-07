import { Test, TestingModule } from '@nestjs/testing'
import { TermsTypesUtils } from '../terms-types.utils'
import * as fillers from './fillers'
import { InternalServerErrorException } from '@nestjs/common'

describe('TermsTypesUtils', () => {
  let termsTypesUtils: TermsTypesUtils

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermsTypesUtils]
    }).compile()

    termsTypesUtils = module.get<TermsTypesUtils>(TermsTypesUtils)
  })

  it('should be defined', () => {
    expect(termsTypesUtils).toBeDefined()
  })

  describe('createTermsTypesArrayFromDB', () => {
    it('should be defined', () => {
      expect(termsTypesUtils.createTermsTypesArrayFromDB).toBeDefined()
    })

    it('should return an array of terms types', () => {
      //Arrange

      //Act
      const result = termsTypesUtils.createTermsTypesArrayFromDB(
        fillers.termsTypesConsult
      )

      //Assert
      expect(result).toEqual(fillers.termsTypes)
    })

    it('should throw an internal server Error', () => {
      //Arrange
      //Act
      //Assert
      expect(() =>
        termsTypesUtils.createTermsTypesArrayFromDB(
          fillers.termsTypesConsultWUndefined
        )
      ).toThrow(InternalServerErrorException)
    })
  })

  describe('createTermTypeFromDB', () => {
    it('should be defined', () => {
      expect(termsTypesUtils.createTermTypeFromDB).toBeDefined()
    })

    it('should return a term type', () => {
      //Arrange
      const termTypeData = fillers.termTypeConsult1
      const expected = fillers.termType1

      //Act
      const result = termsTypesUtils.createTermTypeFromDB(termTypeData)

      //Assert
      expect(result).toEqual(expected)
    })

    it('should throw an internal server Error', () => {
      //Arrange
      //Act
      //Assert
      expect(() =>
        termsTypesUtils.createTermTypeFromDB(fillers.termTypeConsultWUndefined)
      ).toThrow(InternalServerErrorException)
    })
  })

  describe('newTermType', () => {
    it('should be defined', () => {
      expect(termsTypesUtils.newTermType).toBeDefined()
    })

    it('should return a new term type', () => {
      //Arrange
      const termTypeData = fillers.termTypeConsult1
      const expected = fillers.termType1

      //Act
      const result = termsTypesUtils.newTermType(
        termTypeData.term_type_description,
        termTypeData.term_type_id,
        termTypeData.term_type_name
      )

      //Assert
      expect(result).toEqual(expected)
    })
  })
})
