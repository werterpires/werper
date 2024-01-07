import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('terms_types', (table) => {
    table.increments('term_type_id').primary()
    table.string('term_type_name', 100).notNullable().unique()
    table.string('term_type_description', 255)
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('terms_types')
}
