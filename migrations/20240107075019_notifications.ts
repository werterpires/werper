import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('notifications', (table) => {
    table.increments('notification_id').primary()
    table.string('notification_text', 510)
    table.integer('user_id').notNullable().unsigned()
    table
      .foreign('user_id')
      .references('users.user_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('notifications')
}
