import { PartialType } from '@nestjs/swagger';
import { CreateTermsTypeDto } from './create-terms-type.dto';

export class UpdateTermsTypeDto extends PartialType(CreateTermsTypeDto) {}
