import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('people', (table) => {
    table.increments('person_id').primary()
    table.string('name', 60).notNullable()
    table.string('surname', 100)
    table.string('person_type', 1).notNullable()
    table.string('cpf', 11)
    table.string('cnpj', 14)
    table.date('birth_date')
    table.string('address')
    table.string('number', 10)
    table.string('city')
    table.string('state')
    table.string('zip_code', 8)
    table.string('complement')
    table.string('neighborhood')
    table.string('email', 100)
    table.string('phone', 16)
    table.string('cellphone', 16)
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('people')
}
