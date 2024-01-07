import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('occupations', (table) => {
    table.increments('occupation_id').primary()
    table.string('occupation_area', 20).notNullable().unique()
    table.string('occupation_description', 255)
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('occupations')
}
