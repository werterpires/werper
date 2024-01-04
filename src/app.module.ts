import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { KnexModule, KnexModuleOptions } from 'nestjs-knex'
import { PeopleModule } from './basics/people/people.module'
import { UtilsModule } from './shared/utils/utils.module'
import { UsersModule } from './basics/users/users.module';
import { AuthModule } from './shared/auth/auth.module';
import * as dotenv from 'dotenv'
dotenv.config()

export const mysqlConfig: KnexModuleOptions = {
  config: {
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
      host: process.env.SQL_DEV_HOST,
      user: process.env.SQL_DEV_USER,
      password: process.env.SQL_DEV_PASS,
      database: process.env.SQL_DEV_DB,
      ssl: undefined,
      typeCast: function (field, next) {
        if (field.type === 'TINY' && field.length === 1) {
          // retorna tipo booleano ou null
          switch (field.string()) {
            case null:
            case undefined:
            case '':
            case 'null':
            case 'NULL':
              return null
            case '0':
              return false
            case '1':
              return true
          }
        } else if (field.type === 'DATE' && field.length > 1) {
          return field.string() // 1 = true, 0 = false
        } else if (field.type === 'DATETIME' && field.length > 1) {
          return field.string().substring(0, 10) // 1 = true, 0 = false
        }
        return next()
      }
    }
  }
}
@Module({
  imports: [KnexModule.forRoot(mysqlConfig), PeopleModule, UtilsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
