exports.up = (knex) => knex.schema.createTable('projects', (table) => {
    table.increments('id'); // add novo id (incrementa +1)
    table.text('title'); 

    // relacionamento com a tabela de usuarios:
    // 1 usuario pode ter diversos projetos (1-n), projeto pertence a 1 usuario
    table.integer('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE') //o projeto não existirá mais caso o seu user seja deletado
    
    table.timestamps(true, true);
  });

// rollback (desfazer):
exports.down = (knex) => knex.schema.dropTable('projects');

// documentacao knex.js -> knexjs.org
