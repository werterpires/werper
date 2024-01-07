import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roles', (table) => {
    table.increments('role_id').primary()
    table.string('role_name', 20).notNullable().unique()
    table.string('role_description', 255)
    table.timestamps(true, true)
  })

  const roles = [
    {
      role_name: 'superadmin',
      role_description:
        'Usuário com poderes de gerenciar assinantes, assinaturas e instituições. Sem acesso aos dados das empresas'
    },
    {
      role_name: 'signer',
      role_description:
        'Usuário com poderes para criar, ver e editar assinaturas e instituições. Pode intstituir gerentes e agentes.'
    },
    {
      role_name: 'manager',
      role_description: 'Usuário com poderes para gerenciar agentes.'
    },
    {
      role_name: 'agent',
      role_description:
        'Usuário com poderes para Inserir, alterar e excluir registros no sistema.'
    }
  ]
  await knex('roles').insert(roles)
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('roles')
}
