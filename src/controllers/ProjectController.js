const knex = require('../database');
const { create } = require('./UserController');

module.exports = {
  // listar todos os projetos
  async index(req, res, next) {
    try {
      const { user_id, page = 1 } = req.query;
      // caso n tenha page, será 1 (para paginação dos resultados)
      const query = knex('projects')
        .limit(5) // limite de resultados por página
        .offset((page - 1) * 5); // deslocamento para prox pag

      // quantidade total de projetos
      const countObject = knex('projects').count();

      if (user_id) {
        // se tiver user id na rota (ex: /projects?user_id=8)
        query
          .where({ user_id: user_id }) // mostrar apenas os projetos daquele usuario
          .join('users', 'users.id', '=', 'projects.user_id')
          .select('projects.*', 'users.username');

        countObject.where({ user_id });
      }

      const [count] = await countObject;

      console.log(count);
      // enviar no header a quantidade total de projetos
      res.header('X-Total-Count', count['count']);

      const results = await query;

      return res.json(results);
    } catch (error) {
      next(error);
    }
  },

  // criar novo projeto
  async create(req, res, next) {
    try {
      const { title, user_id } = req.body;
      await knex('projects').insert({
        title,
        user_id,
      });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};

// argumento next -> para capturar o erro, caso dê
