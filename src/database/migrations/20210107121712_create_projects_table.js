// TABELA DE PROJETOS

const { onUpdateTrigger } = require('../../../knexfile');

exports.up = async (knex) =>
  knex.schema
    .createTable('projects', (table) => {
      table.increments('id'); // add novo id (incrementa +1)
      table.text('title');

      // relacionamento com a tabela de usuarios:
      // 1 usuario pode ter diversos projetos (1-n), projeto pertence a 1 usuario
      table
        .integer('user_id')
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE'); // ao deletar um user, seus projetos tbm serão excluídos

      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger('projects')));

// rollback (desfazer):
exports.down = async (knex) => knex.schema.dropTable('projects');

// documentacao knex.js -> knexjs.org
