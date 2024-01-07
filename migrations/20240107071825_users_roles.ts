import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users_roles', (table) => {
    table.increments('user_role_id').primary()
    table.integer('user_id').unsigned().notNullable()
    table
      .foreign('user_id')
      .references('users.user_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.integer('role_id').unsigned().notNullable()
    table
      .foreign('role_id')
      .references('roles.role_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users_roles')
}
