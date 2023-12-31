import { Test, TestingModule } from '@nestjs/testing'
import { PeopleUtils } from '../people.utils'
import {
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common'
import { ICreatePersonData, IUpdatePersonData, Person } from '../types'
import { ValidatesService } from 'src/shared/utils/validates.service'
import { CreatePersonDto } from '../dto/create-person.dto'
import { UpdatePersonDto } from '../dto/update-person.dto'

const personFromDB1 = {
  person_id: 1,
  name: 'João',
  surname: 'Silva',
  person_type: 'f',
  cpf: '12345678901',
  cnpj: null,
  birth_date: null,
  address: 'Rua Principal, 123',
  number: '456',
  city: 'Cidadeville',
  state: 'SP',
  zip_code: '12345-678',
  complement: 'Apt 789',
  neighborhood: 'Subúrbio',
  email: 'joao@example.com',
  phone: '555-1234',
  cellphone: '555-5678'
}

const personFromDB2 = {
  person_id: 2,
  name: 'Maria',
  surname: 'Santos',
  person_type: 'j',
  cpf: null,
  cnpj: '9876543210001',
  birth_date: null,
  address: 'Rua Carvalho, 456',
  number: '789',
  city: 'Cidadela',
  state: 'MG',
  zip_code: '54321-987',
  complement: 'Sala 456',
  neighborhood: 'Centro',
  email: 'maria@example.com',
  phone: '555-4321',
  cellphone: null
}

const personFromDBEmailUndefined = {
  person_id: 1,
  name: 'João',
  surname: 'Silva',
  person_type: 'f',
  cpf: '12345678901',
  cnpj: null,
  birth_date: null,
  address: 'Rua Principal, 123',
  number: '456',
  city: 'Cidadeville',
  state: 'SP',
  zip_code: '12345-678',
  complement: 'Apt 789',
  neighborhood: 'Subúrbio',
  email: undefined,
  phone: '555-1234',
  cellphone: '555-5678'
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
  zipCode: '12345-678',
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

let contador = 1

describe('PeopleUtils', () => {
  let peopleUtils: PeopleUtils
  let mockValidatesService: ValidatesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleUtils,
        {
          provide: ValidatesService,
          useValue: {
            validatePerson: jest.fn().mockReturnValue('#')
          }
        }
      ]
    }).compile()

    peopleUtils = module.get<PeopleUtils>(PeopleUtils)
    mockValidatesService = await module.resolve(ValidatesService)
  })

  it('should be defined', () => {
    expect(peopleUtils).toBeDefined()
    expect(mockValidatesService).toBeDefined()
  })

  describe('createPeopleArrayFromDB', () => {
    it('should create an array of people from database result', () => {
      //Arrange
      const consultResult = [personFromDB1, personFromDB2]

      const expected: Person[] = [
        {
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
        },
        {
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
      ]

      //Act
      const result = peopleUtils.createPeopleArrayFromDB(consultResult)

      //Assert
      expect(result).toBeDefined()
      expect(result).toBeInstanceOf(Array)
      expect(result).toEqual(expected)
    })

    it('should throw InternalServerErrorException if any property is undefined', () => {
      const consultResult = [
        personFromDB1,
        personFromDBEmailUndefined,
        personFromDB2
      ]

      expect(() => peopleUtils.createPeopleArrayFromDB(consultResult)).toThrow(
        InternalServerErrorException
      )
    })
  })

  describe('createPersonFromDB', () => {
    it('should create a person from database result', () => {
      const consultResult = personFromDB1

      const expected: Person = {
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

      const result = peopleUtils.createPersonFromDB(consultResult)

      expect(result).toBeDefined()
      expect(result).toBeInstanceOf(Object)
      expect(result).toEqual(expected)
    })

    it('should throw InternalServerErrorException if any property is undefined', () => {
      const consultResult = personFromDBEmailUndefined

      expect(() => peopleUtils.createPersonFromDB(consultResult)).toThrow(
        InternalServerErrorException
      )
    })
  })

  describe('newPerson', () => {
    it('should return a new Person', () => {
      const expected: Person = {
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

      const result = peopleUtils.newPerson(
        personFromDB1.person_id,
        personFromDB1.name,
        personFromDB1.surname,
        personFromDB1.person_type === 'f' ? 'f' : 'j',
        personFromDB1.cpf,
        personFromDB1.cnpj,
        personFromDB1.birth_date,
        personFromDB1.address,
        personFromDB1.number,
        personFromDB1.city,
        personFromDB1.state,
        personFromDB1.zip_code,
        personFromDB1.complement,
        personFromDB1.neighborhood,
        personFromDB1.email,
        personFromDB1.phone,
        personFromDB1.cellphone
      )

      expect(result).toBeDefined()
      expect(result).toBeInstanceOf(Object)
      expect(result).toEqual(expected)
    })
    it('should return a person with email as undefinde', () => {
      //Arrange
      const expected: Person = {
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
        email: undefined,
        phone: '555-1234',
        cellphone: '555-5678'
      }
      //Act
      const result = peopleUtils.newPerson(
        personFromDBEmailUndefined.person_id,
        personFromDBEmailUndefined.name,
        personFromDBEmailUndefined.surname,
        personFromDBEmailUndefined.person_type === 'f' ? 'f' : 'j',
        personFromDBEmailUndefined.cpf,
        personFromDBEmailUndefined.cnpj,
        personFromDBEmailUndefined.birth_date,
        personFromDBEmailUndefined.address,
        personFromDBEmailUndefined.number,
        personFromDBEmailUndefined.city,
        personFromDBEmailUndefined.state,
        personFromDBEmailUndefined.zip_code,
        personFromDBEmailUndefined.complement,
        personFromDBEmailUndefined.neighborhood,
        personFromDBEmailUndefined.email,
        personFromDBEmailUndefined.phone,
        personFromDBEmailUndefined.cellphone
      )
      //Assert

      expect(result).toBeDefined()
      expect(result).toBeInstanceOf(Object)
      expect(result).toEqual(expected)
    })
  })

  describe('newCreatePersonData', () => {
    it('should create a new create person data', () => {
      //Arrange
      const expected: ICreatePersonData = {
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
        zipCode: '12345-678',
        complement: 'Apt 789',
        neighborhood: null,
        email: 'joao@example.com',
        phone: '555-1234',
        cellphone: '555-5678'
      }

      //Act
      const result = peopleUtils.newCreatePersonData(createPersonDto)

      //Assert
      expect(result).toBeDefined()
      expect(result).toBeInstanceOf(Object)
      expect(result).toEqual(expected)
    })

    it('should throw a bad request exception', () => {
      //Arrange

      jest
        .spyOn(mockValidatesService, 'validatePerson')
        .mockImplementation(() => '#/Data inválida/')

      //Assert

      expect(() => {
        peopleUtils.newCreatePersonData(createPersonDto)
      }).toThrow(BadRequestException)
    })
  })

  describe('newUpdatePersonData', () => {
    it('should create a new update person data', () => {
      const expected: IUpdatePersonData = {
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
        zipCode: '12345-678',
        complement: 'Apt 789',
        neighborhood: null,
        email: 'joao@example.com',
        phone: '555-1234',
        cellphone: '555-5678',
        updatedAt: new Date()
      }

      const result = peopleUtils.newUpdatePersonData(updatePersonDto)
      expected.updatedAt = result.updatedAt

      expect(result).toBeDefined()
      expect(result).toBeInstanceOf(Object)
      expect(result).toEqual(expected)
    })

    it('should throw a bad request', () => {
      //Arrange
      jest
        .spyOn(mockValidatesService, 'validatePerson')
        .mockImplementation(() => '#/Data inválida/')
      //Assert
      expect(() => {
        peopleUtils.newUpdatePersonData(updatePersonDto)
      }).toThrow(BadRequestException)
    })
  })

  describe('changeCpf', () => {
    it('should return string of zeros', () => {
      //Arrange
      const expected = '00000000000'
      //Act
      const result = peopleUtils.changeCpf('12345678901')
      //Assert
      expect(result).toEqual(expected)
    })

    it('should return null', () => {
      //Arrange
      const expected = null
      //Act
      const result = peopleUtils.changeCpf(null)
      //Assert
      expect(result).toEqual(expected)
    })
  })
})
