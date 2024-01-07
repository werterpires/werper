import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users_terms', (table) => {
    table.increments('user_term_id').primary()
    table.integer('user_role_id').unsigned().notNullable()
    table
      .foreign('user_role_id')
      .references('users_roles.user_role_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.integer('term_id').unsigned().notNullable()
    table
      .foreign('term_id')
      .references('terms.term_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users_terms')
}
