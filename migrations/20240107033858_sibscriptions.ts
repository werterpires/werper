import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('subscriptions', (table) => {
    table.increments('subscription_id').primary()
    table.string('subscription_title', 255).notNullable()
    table.boolean('subscription_active').defaultTo(true)
    table.date('validate').notNullable()

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('subscriptions')
}
