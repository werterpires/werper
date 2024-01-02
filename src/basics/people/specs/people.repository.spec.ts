import { Test, TestingModule } from '@nestjs/testing'
import { PeopleUtils } from '../people.utils'
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { ICreatePersonData, IUpdatePersonData, Person } from '../types'
import { ValidatesService } from 'src/shared/utils/validates.service'
import { CreatePersonDto } from '../dto/create-person.dto'
import { UpdatePersonDto } from '../dto/update-person.dto'
import { PeopleRepository } from '../people.repository'

import { ErrorsService } from 'src/shared/utils/errors.service'
import { Knex } from 'knex'
import { InjectKnex, KnexModule, KnexModuleOptions } from 'nestjs-knex'
import { mysqlConfig } from 'src/app.module'

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
const person2 = {
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

describe('PeopleRepository', () => {
  let peopleRepository: PeopleRepository
  let mockPeopleUtils: PeopleUtils
  let mockErrorsService: ErrorsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule.forRoot(mysqlConfig)],
      providers: [
        PeopleRepository,
        {
          provide: PeopleUtils,
          useValue: {
            createPeopleArrayFromDB: jest
              .fn()
              .mockReturnValue([person1, person2]),
            createPersonFromDB: jest
              .fn()
              .mockImplementation((peopleConsult) => {
                const person = person1
                person.personId = peopleConsult.person_id
                return person
              })
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

    peopleRepository = module.get<PeopleRepository>(PeopleRepository)
    mockPeopleUtils = module.get<PeopleUtils>(PeopleUtils)
    mockErrorsService = module.get<ErrorsService>(ErrorsService)
  })

  it('should be defined', () => {
    expect(peopleRepository).toBeDefined()
    expect(mockPeopleUtils).toBeDefined()
    expect(mockErrorsService).toBeDefined()
  })

  describe('createPerson', () => {
    it('should return a Person', async () => {
      //Arrange
      const createPersonData: ICreatePersonData = createPersonData1
      const expected: Person = person1

      //Act
      const result = await peopleRepository.createPerson(createPersonData)
      expected.personId = result.personId
      person1.personId = result.personId
      //Assert
      expect(result).toBeDefined()

      expect(result).toEqual(expected)
    })

    it('should throw Bad Request Exception ', () => {
      //Arrange
      const createPersonData: ICreatePersonData = createPersonData1
      jest
        .spyOn(mockErrorsService, 'handleErrors')
        .mockReturnValueOnce(
          new BadRequestException('Entrada duplicada para XXX')
        )

      //Act

      //Assert
      expect(() =>
        peopleRepository.createPerson(createPersonData)
      ).rejects.toThrow(BadRequestException)
    })
  })

  describe('findAllPeople', () => {
    it('should return an array of Person', async () => {
      //Arrange
      const expected = [person1, person2]
      //Act
      const result = await peopleRepository.findAllPeople()
      //Assert
      expect(result).toBeDefined()
      expect(result).toBeInstanceOf(Array<Person>)
      expect(result).toHaveLength(2)
      expect(result).toEqual(expected)
    })

    it('should return an empty array', async () => {
      //Arrange
      jest
        .spyOn(mockPeopleUtils, 'createPeopleArrayFromDB')
        .mockReturnValueOnce([])
      //Act
      const result = await peopleRepository.findAllPeople()
      //Assert
      expect(result).toBeDefined()
      expect(result).toBeInstanceOf(Array<Person>)
      expect(result).toHaveLength(0)
    })
  })

  describe('findPersonById', () => {
    it('should return a Person', async () => {
      //Arrange
      const personId = person1.personId
      const expected = person1
      //Act
      const result = await peopleRepository.findPersonById(personId)
      //Assert
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })

    it('should throw Not Found Exception', () => {
      //Arrange
      jest
        .spyOn(mockErrorsService, 'handleErrors')
        .mockReturnValueOnce(
          new NotFoundException('Pessoa test não encontrada')
        )
      const personId = person1.personId - 1
      //Act
      expect(() => peopleRepository.findPersonById(personId)).rejects.toThrow(
        NotFoundException
      )
    })
  })

  describe('updatePersonById', () => {
    it('should return a Person', async () => {
      //Arrange
      updatePersonData.personId = person1.personId

      const expected = person1
      expected.personId = person1.personId
      //Act
      const result = await peopleRepository.updatePersonById(updatePersonData)
      //Assert
      expect(result).toBeDefined()
      expect(result).toEqual(expected)
    })

    it('should throw Not Found Exception', () => {
      //Arrange
      jest
        .spyOn(mockErrorsService, 'handleErrors')
        .mockReturnValueOnce(
          new NotFoundException('Pessoa test não encontrada')
        )
      updatePersonData.personId = person1.personId - 1
      //Act
      expect(() =>
        peopleRepository.updatePersonById(updatePersonData)
      ).rejects.toThrow(NotFoundException)
    })
  })

  describe('deletePersonById', () => {
    it('should delete a Person', async () => {
      //Arrange
      const personId = person1.personId

      //Act
      const result = await peopleRepository.deletePersonById(personId)

      expect(result).toBeUndefined()
    })

    it('should throw Not Found Exception', () => {
      //Arrange
      jest
        .spyOn(mockErrorsService, 'handleErrors')
        .mockReturnValueOnce(
          new NotFoundException('Pessoa test não encontrada')
        )
      const personId = person1.personId

      //Act
      expect(() => peopleRepository.deletePersonById(personId)).rejects.toThrow(
        NotFoundException
      )
    })
  })
})
