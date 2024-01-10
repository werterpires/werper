import { Test, TestingModule } from '@nestjs/testing'
import { RolesUtils } from '../roles.utils'
import { ValidatesService } from 'src/shared/utils/validates.service'
import * as fillers from './fillers'
import { InternalServerErrorException } from '@nestjs/common'

describe('RolesService', () => {
  let rolesUtils: RolesUtils
  let mockValidatesService: ValidatesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesUtils,
        {
          provide: ValidatesService,
          useValue: {
            validatePerson: jest.fn().mockReturnValue('#')
          }
        }
      ]
    }).compile()

    rolesUtils = module.get<RolesUtils>(RolesUtils)
    mockValidatesService = module.get<ValidatesService>(ValidatesService)
  })

  it('should be defined', () => {
    expect(rolesUtils).toBeDefined()
  })

  describe('newRole', () => {
    it('should be defined', () => {
      expect(rolesUtils.newRole).toBeDefined()
    })

    it('should return a role', () => {
      //Arrange
      const id = fillers.roleFfromDB1.role_id
      const name = fillers.roleFfromDB1.role_name
      const description = fillers.roleFfromDB1.role_description

      //Act
      const result = rolesUtils.newRole(id, name, description)

      //Assert
      expect(result).toEqual(fillers.role1)
    })
  })
  describe('createRolesArrayFromDB', () => {
    it('should return an array of roles', () => {
      //Arrange
      const expected = fillers.rolesArray
      //Act
      const result = rolesUtils.createRolesArrayFromDB(fillers.rolesArrayFromDb)
      //Assert
      expect(result).toEqual(expected)
    })

    it('should throw a internal server error', () => {
      //Assert
      expect(() =>
        rolesUtils.createRolesArrayFromDB(fillers.rolesfromDBwithNoName)
      ).toThrow(InternalServerErrorException)
    })
  })
  describe('createRoleFromDB', () => {
    it('should return a role', () => {
      //Act
      const result = rolesUtils.createRoleFromDB(fillers.roleFfromDB1)
      //Assert
      expect(result).toEqual(fillers.role1)
    })

    it('should throw a internal server error', () => {
      //Assert
      expect(() =>
        rolesUtils.createRoleFromDB(fillers.roleFfromDBwithNoName)
      ).toThrow(InternalServerErrorException)
    })
  })
})
