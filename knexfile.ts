import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.SQL_DEV_HOST,
      user: process.env.SQL_DEV_USER,
      password: process.env.SQL_DEV_PASS,
      database: process.env.SQL_DEV_DB,
      charset: 'utf8mb4',
      ssl: undefined,
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

module.exports = config;
