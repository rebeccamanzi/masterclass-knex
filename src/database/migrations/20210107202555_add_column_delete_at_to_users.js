// COLUNA DE USUARIOS 'DELETADOS'

exports.up = (knex) =>
  // mapeando o banco de dados:
  knex.schema.alterTable('users', (table) => {
    table.timestamp('deleted_at'); // data do momento que foi 'deletado'
  });

// rollback (desfazer):
exports.down = (knex) =>
  knex.schema.alterTable('users', (table) => {
    table.dropColumn('deleted_at'); // exclui a coluna
  });

// documentacao knex.js -> knexjs.org
