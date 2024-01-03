import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put
} from '@nestjs/common'
import { PeopleService } from './people.service'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { Person } from './types'
import { ErrorsService } from 'src/shared/utils/errors.service'

@Controller('people')
export class PeopleController {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly errorsService: ErrorsService
  ) {}

  @Post()
  async createPerson(
    @Body() createPersonDto: CreatePersonDto
  ): Promise<Person> {
    try {
      const person = await this.peopleService.createPerson(createPersonDto)
      return person
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível criar a pessoa.',
        'controller/createPerson'
      )
    }
  }

  @Get()
  async findAllPeople(): Promise<Person[]> {
    try {
      const people = await this.peopleService.findAllPeople()
      return people
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar todas as pessoas.',
        'controller/findAllPeople'
      )
    }
  }

  @Get(':id')
  async findOnePersonById(@Param('id') id: string): Promise<Person> {
    try {
      const person = await this.peopleService.findPersonById(+id)
      return person
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível buscar a pessoa.',
        'controller/findOnePersonById'
      )
    }
  }

  @Put()
  async updatePersonById(
    @Body() updatePersonDto: UpdatePersonDto
  ): Promise<Person> {
    try {
      const person = await this.peopleService.updatePersonById(updatePersonDto)
      return person
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível atualizar a pessoa.',
        'controller/updatePersonById'
      )
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePersonById(@Param('id') id: string) {
    try {
      await this.peopleService.deletePersonById(+id)
    } catch (error) {
      throw this.errorsService.handleErrors(
        error,
        '#Não foi possível atualizar a pessoa.',
        'controller/deletePerson'
      )
    }
  }
}
