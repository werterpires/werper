import { Test, TestingModule } from '@nestjs/testing'
import { RolesController } from '../roles.controller'
import { RolesService } from '../roles.service'
import * as fillers from './fillers'
import { ErrorsService } from 'src/shared/utils/errors.service'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'

describe('RolesController', () => {
  let rolesController: RolesController
  let mockRolesService: RolesService
  let mockErrorsService: ErrorsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: {
            findAllRoles: jest.fn().mockReturnValue(fillers.rolesArray),
            findRoleById: jest.fn().mockReturnValue(fillers.role1)
          }
        },
        {
          provide: ErrorsService,
          useValue: {
            handleErrors: jest
              .fn()
              .mockReturnValue(new InternalServerErrorException())
          }
        }
      ]
    }).compile()

    rolesController = module.get<RolesController>(RolesController)
    mockRolesService = module.get<RolesService>(RolesService)
    mockErrorsService = module.get<ErrorsService>(ErrorsService)
  })

  it('should be defined', () => {
    expect(rolesController).toBeDefined()
  })

  describe('findAllRoles', () => {
    it('should be defined', () => {
      expect(rolesController.findAllRoles).toBeDefined()
    })

    it('should return an array of roles', async () => {
      //Act
      const roles = await rolesController.findAllRoles()

      //Assert
      expect(roles).toEqual(fillers.rolesArray)
      expect(mockRolesService.findAllRoles).toHaveBeenCalledTimes(1)
    })

    it('should throw a internal server error', async () => {
      //Arrange
      jest
        .spyOn(mockErrorsService, 'handleErrors')
        .mockReturnValue(
          new InternalServerErrorException('erro estourado no error')
        )
      jest
        .spyOn(mockRolesService, 'findAllRoles')
        .mockRejectedValueOnce(
          new InternalServerErrorException('erro extourado no service')
        )
      //Act
      //Assert
      expect(() => rolesController.findAllRoles()).rejects.toThrow(
        InternalServerErrorException
      )
    })
  })

  describe('findRoleById', () => {
    it('should be defined', () => {
      expect(rolesController.findRoleById).toBeDefined()
    })

    it('should return a role', async () => {
      //Act
      const role = await rolesController.findRoleById('1')

      //Assert
      expect(role).toEqual(fillers.role1)
      expect(mockRolesService.findRoleById).toHaveBeenCalledTimes(1)
    })

    it('should throw a internal server error', async () => {
      //Arrange
      jest
        .spyOn(mockErrorsService, 'handleErrors')
        .mockReturnValue(new NotFoundException('erro estourado no error'))
      jest
        .spyOn(mockRolesService, 'findRoleById')
        .mockRejectedValueOnce(
          new NotFoundException('erro extourado no service')
        )
      //Act
      //Assert
      expect(() => rolesController.findRoleById('1')).rejects.toThrow(
        NotFoundException
      )
    })
  })
})
