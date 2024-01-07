import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users_roles_subscriptions', (table) => {
    table.increments('user_role_subscription_id').primary()
    table.integer('user_role_id').unsigned().notNullable()
    table
      .foreign('user_role_id')
      .references('users_roles.user_role_id')
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
  return knex.schema.dropTable('users_roles_subscriptions')
}
