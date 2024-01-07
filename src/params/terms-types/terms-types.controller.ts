import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TermsTypesService } from './terms-types.service';
import { CreateTermsTypeDto } from './dto/create-terms-type.dto';
import { UpdateTermsTypeDto } from './dto/update-terms-type.dto';

@Controller('terms-types')
export class TermsTypesController {
  constructor(private readonly termsTypesService: TermsTypesService) {}

  @Post()
  create(@Body() createTermsTypeDto: CreateTermsTypeDto) {
    return this.termsTypesService.create(createTermsTypeDto);
  }

  @Get()
  findAll() {
    return this.termsTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termsTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTermsTypeDto: UpdateTermsTypeDto) {
    return this.termsTypesService.update(+id, updateTermsTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termsTypesService.remove(+id);
  }
}
