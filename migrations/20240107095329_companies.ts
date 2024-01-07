import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('companies', (table) => {
    table.increments('company_id').primary()
    table.string('company_description', 255)
    table.integer('person_id').notNullable().unsigned().unique()
    table
      .foreign('person_id')
      .references('people.person_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.integer('subscription_id').unsigned().notNullable()
    table
      .foreign('subscription_id')
      .references('subscriptions.subscription_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('companies')
}
