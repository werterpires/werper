import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users_utilities', (table) => {
    table.increments('user_utility_id').primary()
    table.integer('user_id').unsigned()
    table
      .foreign('user_id')
      .references('users.user_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')

    //token to be used to recover password
    table.string('recoverToken')

    //indicates if the user is loggeed
    table.boolean('logged').notNullable().defaultTo(false)

    //indicates last try to login
    table.timestamp('lastTryLogin')

    //indicates how many times tryed to login in last 5 minutes
    table.integer('loginAttempts').defaultTo(0)

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {}
