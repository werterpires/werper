import { Test, TestingModule } from '@nestjs/testing'
import { PeopleUtils } from './people.utils'
import { Person } from './types'

describe('PeopleUtils', () => {
  let peopleUtils: PeopleUtils

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeopleUtils]
    }).compile()

    peopleUtils = module.get<PeopleUtils>(PeopleUtils)
  })

  it('should be defined', () => {
    expect(peopleUtils).toBeDefined()
  })
})
