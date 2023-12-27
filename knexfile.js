import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const mysqlConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DEV ? process.env.SQL_DEV_HOST : process.env.SQL_HOST,
    user: process.env.DEV ? process.env.SQL_DEV_USER : process.env.SQL_USER,
    password: process.env.DEV ? process.env.SQL_DEV_PASS : process.env.SQL_PASS,
    database: process.env.DEV ? process.env.SQL_DEV_DB : process.env.SQL_DB,
    ssl: process.env.DEV
      ? undefined
      : {
          ca: fs.readFileSync(path.join(__dirname, 'src/mysql_ca_cert.pem')),
        },
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

module.exports = mysqlConfig;
