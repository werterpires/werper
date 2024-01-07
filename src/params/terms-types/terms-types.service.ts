import { Injectable } from '@nestjs/common';
import { CreateTermsTypeDto } from './dto/create-terms-type.dto';
import { UpdateTermsTypeDto } from './dto/update-terms-type.dto';

@Injectable()
export class TermsTypesService {
  create(createTermsTypeDto: CreateTermsTypeDto) {
    return 'This action adds a new termsType';
  }

  findAll() {
    return `This action returns all termsTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} termsType`;
  }

  update(id: number, updateTermsTypeDto: UpdateTermsTypeDto) {
    return `This action updates a #${id} termsType`;
  }

  remove(id: number) {
    return `This action removes a #${id} termsType`;
  }
}
