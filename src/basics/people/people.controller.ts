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
import { IPerson } from './types'
import { ErrorsService } from 'src/shared/utils/errors.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Person } from './swagger/responses'
import { CurrentUser } from 'src/shared/auth/decorators/current-user.decorator'

@Controller('people')
@ApiTags('People')
export class PeopleController {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly errorsService: ErrorsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'create a new person.' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Person
  })
  async createPerson(
    @Body() createPersonDto: CreatePersonDto
  ): Promise<IPerson> {
    try {
      const person: IPerson =
        await this.peopleService.createPerson(createPersonDto)
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
  @ApiOperation({ summary: 'find all people' })
  @ApiResponse({
    status: 200,
    description: 'The values have been successfully returned.',
    type: [Person]
  })
  async findAllPeople(@CurrentUser() user): Promise<IPerson[]> {
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
  @ApiOperation({ summary: 'find one person by id' })
  @ApiResponse({
    status: 200,
    description: 'The values have been successfully returned.',
    type: Person
  })
  async findOnePersonById(@Param('id') id: string): Promise<IPerson> {
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
  @ApiOperation({ summary: 'update a person by id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Person
  })
  async updatePersonById(
    @Body() updatePersonDto: UpdatePersonDto
  ): Promise<IPerson> {
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
  @ApiOperation({ summary: 'delete a person by id' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
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
