exports.up = (knex) =>
  // mapeando o banco de dados:
  knex.schema.createTable('users', (table) => {
    table.increments('id'); // add novo id (incrementa +1)
    table.text('username').unique().notNullable(); // campo de texto (único e não pode ser vazio)

    table.timestamp('created_at').defaultTo(knex.fn.now()); // data do momento de criação
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // data do momento de atualização
  });

// rollback (desfazer):
exports.down = (knex) => knex.schema.dropTable('users');

// documentacao knex.js -> knexjs.org
