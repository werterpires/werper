import { Test, TestingModule } from '@nestjs/testing'
import { RolesService } from '../roles.service'
import { RolesRepository } from '../roles.repository'
import * as fillers from './fillers'
import { RolesUtils } from '../roles.utils'
import { ErrorsService } from 'src/shared/utils/errors.service'
import { InternalServerErrorException } from '@nestjs/common'

describe('RolesService', () => {
  let rolesService: RolesService
  let mockRolesUtils: RolesUtils
  let mockRolesRepository: RolesRepository
  let mockErrorsService: ErrorsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: RolesRepository,
          useValue: {
            findAllRoles: jest.fn().mockReturnValue(fillers.rolesArrayFromDb),
            findRoleById: jest.fn().mockReturnValue(fillers.roleFfromDB1)
          }
        },
        {
          provide: RolesUtils,
          useValue: {
            createRolesArrayFromDB: jest
              .fn()
              .mockReturnValue(fillers.rolesArray),
            createRoleFromDB: jest.fn().mockReturnValue(fillers.role1)
          }
        },
        {
          provide: ErrorsService,
          useValue: {
            handleErrors: jest
              .fn()
              .mockResolvedValue(new InternalServerErrorException())
          }
        }
      ]
    }).compile()

    rolesService = module.get<RolesService>(RolesService)
    mockRolesUtils = module.get<RolesUtils>(RolesUtils)
    mockRolesRepository = module.get<RolesRepository>(RolesRepository)
    mockErrorsService = module.get<ErrorsService>(ErrorsService)
  })

  it('should be defined', () => {
    expect(rolesService).toBeDefined()
  })

  describe('findAllRoles', () => {
    it('should be defined', () => {
      expect(rolesService.findAllRoles).toBeDefined()
    })

    it('should return an array of roles', async () => {
      //Act
      const roles = await rolesService.findAllRoles()

      //Assert
      expect(roles).toEqual(fillers.rolesArray)
    })

    it('should throw a internal server error', async () => {
      //Arrange
      jest
        .spyOn(mockErrorsService, 'handleErrors')
        .mockReturnValue(
          new InternalServerErrorException('erro estourado no error')
        )
      jest
        .spyOn(mockRolesRepository, 'findAllRoles')
        .mockRejectedValueOnce(
          new InternalServerErrorException('erro extourado no repo')
        )
      //Act
      //Assert
      expect(() => rolesService.findAllRoles()).rejects.toThrow(
        InternalServerErrorException
      )
    })
  })

  describe('findRoleById', () => {
    it('should be defined', () => {
      expect(rolesService.findRoleById).toBeDefined()
    })

    it('should return a role', async () => {
      //Act
      const role = await rolesService.findRoleById(1)

      //Assert
      expect(role).toEqual(fillers.role1)
    })

    it('should throw a internal server error', async () => {
      //Arrange
      jest
        .spyOn(mockErrorsService, 'handleErrors')
        .mockReturnValue(
          new InternalServerErrorException('erro estourado no error')
        )
      jest
        .spyOn(mockRolesRepository, 'findRoleById')
        .mockRejectedValueOnce(
          new InternalServerErrorException('erro extourado no repo')
        )
      //Act
      //Assert
      expect(() => rolesService.findRoleById(1)).rejects.toThrow(
        InternalServerErrorException
      )
    })
  })
})
