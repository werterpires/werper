import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule, KnexModuleOptions } from 'nestjs-knex';
import * as fs from 'fs';
import path from 'path';

const mysqlConfig: KnexModuleOptions = {
  config: {
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
      host: process.env.DEV ? process.env.SQL_DEV_HOST : process.env.SQL_HOST,
      user: process.env.DEV ? process.env.SQL_DEV_USER : process.env.SQL_USER,
      password: process.env.DEV
        ? process.env.SQL_DEV_PASS
        : process.env.SQL_PASS,
      database: process.env.DEV ? process.env.SQL_DEV_DB : process.env.SQL_DB,
      ssl: process.env.DEV
        ? undefined
        : {
            ca: fs.readFileSync(path.join(__dirname, 'mysql_ca_cert.pem')),
          },
      typeCast: function (field, next) {
        if (field.type === 'TINY' && field.length === 1) {
          // retorna tipo booleano ou null
          switch (field.string()) {
            case null:
            case undefined:
            case '':
            case 'null':
            case 'NULL':
              return null;
            case '0':
              return false;
            case '1':
              return true;
          }
        } else if (field.type === 'DATE' && field.length > 1) {
          return field.string(); // 1 = true, 0 = false
        } else if (field.type === 'DATETIME' && field.length > 1) {
          return field.string().substring(0, 10); // 1 = true, 0 = false
        }
        return next();
      },
    },
  },
};
@Module({
  imports: [KnexModule.forRoot(mysqlConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
