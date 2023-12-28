import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}

