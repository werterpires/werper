import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('people', (table) => {
    table.integer('subscription_id').unsigned()
    table
      .foreign('subscription_id')
      .references('subscriptions.subscription_id')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.unique(['cpf', 'subscription_id'], { indexName: 'unique_cpf' })
    table.unique(['cnpj', 'subscription_id'], { indexName: 'unique_cpf' })
    table.unique(['email', 'subscription_id'], { indexName: 'unique_cpf' })
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('people', (table) => {
    table.dropForeign('subscription_id')
    table.dropUnique(
      ['cpf', 'subscription_id'],
      'unique_nota_fiscal_fornecedor'
    )
    table.dropUnique(
      ['cnpj', 'subscription_id'],
      'unique_nota_fiscal_fornecedor'
    )
    table.dropUnique(
      ['email', 'subscription_id'],
      'unique_nota_fiscal_fornecedor'
    )
    table.dropColumn('subscription_id')
  })
}
