import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('people', (table) => {
    table.integer('company_id').unsigned().notNullable()
    table
      .foreign('company_id')
      .references('companies.company_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('people', (table) => {
    table.dropForeign('company_id')
    table.dropColumn('company_id')
  })
}
