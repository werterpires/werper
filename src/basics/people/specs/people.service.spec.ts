import { Test, TestingModule } from '@nestjs/testing'
import { PeopleService } from '../people.service'
import { ErrorsService } from 'src/shared/utils/errors.service'
import {
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common'
import { PeopleRepository } from '../people.repository'
import { ICreatePersonData, IUpdatePersonData, Person } from '../types'
import { PeopleUtils } from '../people.utils'
import { CreatePersonDto } from '../dto/create-person.dto'
import { UpdatePersonDto } from '../dto/update-person.dto'

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
const createPersonData1: ICreatePersonData = {
  name: 'João',
  surname: 'Silva',
  personType: 'f',
  cpf: '12345678901',
  cnpj: null,
  birthDate: new Date('12/31/2023'),
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

const updatePersonData: IUpdatePersonData = {
  personId: 1,
  name: 'João',
  surname: 'Silva',
  personType: 'f',
  cpf: '12345678901',
  cnpj: null,
  birthDate: new Date('12/31/2023'),
  address: 'Rua Principal, 123',
  number: '456',
  city: 'Cidadeville',
  state: 'SP',
  zipCode: '12345678',
  complement: 'Apt 789',
  neighborhood: null,
  email: 'joao@example.com',
  phone: '555-1234',
  cellphone: '555-5678',
  updatedAt: new Date('12/31/2023')
}

describe('PeopleService', () => {
  let peopleService: PeopleService
  let mockPeopleUtils: PeopleUtils
  let mockPeopleRepository: PeopleRepository
  let mockErrorsService: ErrorsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: ErrorsService,
          useValue: {
            handleErrors: jest
              .fn()
              .mockResolvedValueOnce(new InternalServerErrorException())
          }
        },
        {
          provide: PeopleRepository,
          useValue: {
            createPerson: jest.fn().mockResolvedValue(person1),
            findPersonById: jest.fn().mockResolvedValue(person1),
            updatePersonById: jest.fn().mockResolvedValue(person1),
            deletePersonById: jest.fn().mockResolvedValue(1),
            findAllPeople: jest.fn().mockResolvedValue([person1, person2])
          }
        },
        {
          provide: PeopleUtils,
          useValue: {
            newCreatePersonData: jest.fn().mockReturnValue(createPersonData1),
            newUpdatePersonData: jest.fn().mockReturnValue(updatePersonData),
            changeCpf: jest.fn().mockImplementation((cpf: string | null) => {
              if (cpf) return '00000000000'
              return null
            })
          }
        }
      ]
    }).compile()

    peopleService = module.get<PeopleService>(PeopleService)
    mockPeopleUtils = module.get<PeopleUtils>(PeopleUtils)
    mockPeopleRepository = module.get<PeopleRepository>(PeopleRepository)
    mockErrorsService = module.get<ErrorsService>(ErrorsService)
  })

  it('should be defined', () => {
    expect(peopleService).toBeDefined()
    expect(mockPeopleUtils).toBeDefined()
    expect(mockPeopleRepository).toBeDefined()
    expect(mockErrorsService).toBeDefined()
  })

  describe('createNewPerson', () => {
    it('should create a new person', async () => {
      //Arrange
      const expected = person1
      expected.cpf = '00000000000'

      //Act
      const newPerson = await peopleService.createPerson(createPersonDto)

      //Assert
      expect(newPerson).toEqual(expected)
    })

    it('should return a person with null cpf', async () => {
      //Arrange
      const dto = createPersonDto
      dto.cpf = null
      const expected = person1
      expected.cpf = null

      //Act
      const result = await peopleService.createPerson(dto)

      //Assert
      expect(result).toEqual(expected)
    })
  })

  describe('findAllPeople', () => {
    it('should return an array of people wiht people[0] with cpf null', async () => {
      //Arrange
      const person = person1
      person.cpf = null
      jest
        .spyOn(mockPeopleRepository, 'findAllPeople')
        .mockResolvedValue([person, person2])
      const expected = [person1, person2]

      //Act
      const result = await peopleService.findAllPeople()

      //Assert
      expect(result).toEqual(expected)
    })

    it('should return an array of people', async () => {
      //Arrange

      const expected = [person1, person2]

      //Act
      const result = await peopleService.findAllPeople()

      //Assert
      expect(result).toEqual(expected)
    })
  })

  describe('findPersonById', () => {
    it('should return a person', async () => {
      //Arrange
      const expected = person1
      const personId = 1
      //Act
      const result = await peopleService.findPersonById(personId)
      //Assert
      expect(result).toEqual(expected)
    })
    it('shouuld return a person with null cpf', async () => {
      //Arrange
      const personId = 1
      const expected = person1
      expected.cpf = null
      const person = person1
      person.cpf = null
      jest
        .spyOn(mockPeopleRepository, 'findPersonById')
        .mockResolvedValue(person)
      //Act
      const result = await peopleService.findPersonById(personId)
      //Assert
      expect(result).toEqual(expected)
    })
  })

  describe('updatePersonById', () => {
    it('should return a person updated', async () => {
      //Arrange
      const expected = person1

      //Act
      const result = await peopleService.updatePersonById(updatePersonDto)
      //Assert
      expect(result).toEqual(expected)
    })
  })

  describe('deletePerson', () => {
    it('should return nothing', async () => {
      //Arrange

      const personId = 1
      //Act
      const result = await peopleService.deletePersonById(personId)
      //Assert
      expect(result).toBeUndefined()
      expect(mockPeopleRepository.deletePersonById).toHaveBeenCalledWith(
        personId
      )
    })
  })
})
