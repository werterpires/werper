import { Test, TestingModule } from '@nestjs/testing'
import { PeopleController } from '../people.controller'
import { PeopleService } from '../people.service'
import { Person } from '../types'
import { ErrorsService } from 'src/shared/utils/errors.service'
import { InternalServerErrorException } from '@nestjs/common'
import { CreatePersonDto } from '../dto/create-person.dto'
import { UpdatePersonDto } from '../dto/update-person.dto'

const person1: Person = {
  personId: 1,
  name: 'João',
  surname: 'Silva',
  personType: 'f',
  cpf: '12345678901',
  cnpj: null,
  birthDate: null,
  address: 'Rua Principal, 123',
  number: '456',
  city: 'Cidadeville',
  state: 'SP',
  zipCode: '12345-678',
  complement: 'Apt 789',
  neighborhood: 'Subúrbio',
  email: 'joao@example.com',
  phone: '555-1234',
  cellphone: '555-5678'
}
const person2: Person = {
  personId: 2,
  name: 'Maria',
  surname: 'Santos',
  personType: 'j',
  cpf: null,
  cnpj: '9876543210001',
  birthDate: null,
  address: 'Rua Carvalho, 456',
  number: '789',
  city: 'Cidadela',
  state: 'MG',
  zipCode: '54321-987',
  complement: 'Sala 456',
  neighborhood: 'Centro',
  email: 'maria@example.com',
  phone: '555-4321',
  cellphone: null
}

const createPersonDto: CreatePersonDto = {
  name: 'João',
  surname: 'Silva',
  personType: 'f',
  cpf: '12345678901',
  cnpj: null,
  birthDate: '12/31/2023',
  address: 'Rua Principal, 123',
  number: '456',
  city: 'Cidadeville',
  state: 'SP',
  zipCode: '12345678',
  complement: 'Apt 789',
  neighborhood: null,
  email: 'joao@example.com',
  phone: '555-1234',
  cellphone: '555-5678'
}

const updatePersonDto: UpdatePersonDto = {
  ...createPersonDto,
  personId: 1
}

describe('PeopleController', () => {
  let controller: PeopleController
  let mockPeopleService: PeopleService
  let mockErrorsService: ErrorsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        {
          provide: PeopleService,
          useValue: {
            createPerson: jest.fn().mockResolvedValue(person1),
            findPersonById: jest.fn().mockResolvedValue(person1),
            updatePersonById: jest.fn().mockResolvedValue(person1),
            deletePersonById: jest.fn().mockResolvedValue(undefined),
            findAllPeople: jest.fn().mockResolvedValue([person1, person2])
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

    controller = module.get<PeopleController>(PeopleController)
    mockPeopleService = module.get<PeopleService>(PeopleService)
    mockErrorsService = module.get<ErrorsService>(ErrorsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('createPerson', () => {
    it('should create a person', async () => {
      // Arrange
      // Act
      const result = await controller.createPerson(createPersonDto)

      expect(result).toEqual(person1)
    })

    it('should throw an eror', async () => {
      //Arrange
      jest
        .spyOn(mockPeopleService, 'createPerson')
        .mockRejectedValueOnce(new InternalServerErrorException())

      //Act

      //Assert
      expect(controller.createPerson(createPersonDto)).rejects.toThrow(
        InternalServerErrorException
      )
    })
  })

  describe('findAllPeople', () => {
    it('should return all people', async () => {
      // Arrange
      // Act
      const result = await controller.findAllPeople()

      // Assert
      expect(result).toEqual([person1, person2])
    })

    it('should throw an error', async () => {
      // Arrange
      jest
        .spyOn(mockPeopleService, 'findAllPeople')
        .mockRejectedValueOnce(new InternalServerErrorException())

      // Act
      // Assert
      expect(controller.findAllPeople()).rejects.toThrow(
        InternalServerErrorException
      )
    })
  })

  describe('findOnePersonById', () => {
    it('should return a person', async () => {
      // Arrange
      // Act
      const result = await controller.findOnePersonById('1')

      // Assert
      expect(result).toEqual(person1)
    })

    it('should throw an error', async () => {
      // Arrange
      jest
        .spyOn(mockPeopleService, 'findPersonById')
        .mockRejectedValueOnce(new InternalServerErrorException())

      // Act
      // Assert
      expect(controller.findOnePersonById('1')).rejects.toThrow(
        InternalServerErrorException
      )
    })
  })

  describe('updatePersonById', () => {
    it('should update a person', async () => {
      // Arrange
      // Act
      const result = await controller.updatePersonById(updatePersonDto)

      // Assert
      expect(result).toEqual(person1)
      expect(mockPeopleService.updatePersonById).toHaveBeenCalledWith(
        updatePersonDto
      )
    })

    it('should throw an error', async () => {
      // Arrange
      jest
        .spyOn(mockPeopleService, 'updatePersonById')
        .mockRejectedValueOnce(new InternalServerErrorException())

      // Act
      // Assert
      expect(controller.updatePersonById(updatePersonDto)).rejects.toThrow(
        InternalServerErrorException
      )
    })
  })

  describe('deletePerson', () => {
    it('should delete a person', async () => {
      // Arrange
      // Act
      const result = await controller.deletePersonById('1')

      // Assert
      expect(result).toBeUndefined()
      expect(mockPeopleService.deletePersonById).toHaveBeenCalledWith(1)
    })

    it('should throw an error', async () => {
      // Arrange
      jest
        .spyOn(mockPeopleService, 'deletePersonById')
        .mockRejectedValueOnce(new InternalServerErrorException())

      // Act
      // Assert

      expect(controller.deletePersonById('1')).rejects.toThrow(
        InternalServerErrorException
      )
      expect(mockPeopleService.deletePersonById).toHaveBeenCalledWith(1)
    })
  })
})
