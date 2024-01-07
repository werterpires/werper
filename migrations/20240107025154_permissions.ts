import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('permissions', (table) => {
    table.increments('permission_id').primary()
    table.string('permission', 20).notNullable().unique()
    table.timestamps(true, true)
  })

  const permissions = [
    {
      permission: 'record'
    },
    {
      permission: 'seeOwn'
    },
    {
      permission: 'seeAll'
    },
    {
      permission: 'updateOwn'
    },
    {
      permission: 'updateAll'
    },
    {
      permission: 'deleteOwn'
    },
    {
      permission: 'deleteAll'
    }
  ]
  await knex('permissions').insert(permissions)
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('permissions')
}
