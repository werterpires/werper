import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('people', (table) => {
    table.increments('person_id').primary();
    table.string('name', 150).notNullable();
    table.string('cpf', 11).unique();
    table.date('birth_date');
    table.string('address');
    table.string('number', 10);
    table.string('city');
    table.string('state');
    table.string('zip_code', 8);
    table.string('email', 100).unique();
    table.string('phone', 11);
    table.string('cellphone', 11);

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('people');
}
