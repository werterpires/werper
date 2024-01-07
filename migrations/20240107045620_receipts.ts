import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('receipts', (table) => {
    table.increments('receipt_id').primary()
    table.integer('subscription_id').unsigned().notNullable()

    table
      .foreign('subscription_id')
      .references('subscriptions.subscription_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')

    table.decimal('value', 10, 2).notNullable()
    table.string('payment_method', 20).notNullable()
    table.date('due_date').notNullable()
    table.date('recept_date')
    table.string('due_code', 255)
    table.string('authentication_code', 255)

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('receipts')
}
