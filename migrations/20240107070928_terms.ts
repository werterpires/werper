import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('terms', (table) => {
    table.increments('term_id').primary()
    table.integer('term_type_id').unsigned().notNullable()
    table
      .foreign('term_type_id')
      .references('terms_types.term_type_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.integer('role_id').unsigned().notNullable()
    table
      .foreign('role_id')
      .references('roles.role_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.string('term_text', 30000).notNullable().unique()
    table.string('term_description', 255)
    table.string('term_version').notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('terms')
}
