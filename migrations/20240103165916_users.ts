import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary()
    table.integer('person_id').unsigned()
    table
      .foreign('person_id')
      .references('people.person_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')

    table.string('passwordHash').notNullable()

    //token to be used to recover password
    table.string('recoverToken')

    //indicates if the user is loggeed
    table.boolean('logged').notNullable().defaultTo(false)

    //indicates last try to login
    table.timestamp('lastTryLogin')

    //indicates how many times tryed to login in last 5 minutes
    table.integer('loginAttempts').defaultTo(0)

    table.foreign('')

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
