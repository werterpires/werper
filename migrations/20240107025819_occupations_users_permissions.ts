import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('occupations_users_permissions', (table) => {
    table.increments('id').primary()
    table.integer('user_id').unsigned()

    table.integer('occupation_id').unsigned()

    table.integer('permission_id').unsigned()

    table
      .foreign('user_id')
      .references('users.user_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table
      .foreign('occupation_id')
      .references('occupations.occupation_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table
      .foreign('permission_id')
      .references('permissions.permission_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('departments_users_permissions')
}
