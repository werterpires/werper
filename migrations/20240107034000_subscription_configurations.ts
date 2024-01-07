import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('subscription_configurations', (table) => {
    table.increments('subscription_configuration_id').primary()
    table.integer('subscription_id').unsigned().notNullable()
    table
      .foreign('subscription_id')
      .references('subscriptions.subscription_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.string('subscription_historic')
    table.integer('companies_number').unsigned().notNullable()
    table.integer('users_number').unsigned().notNullable()
    table.decimal('price', 10, 2).notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('subscription_prices')
}
