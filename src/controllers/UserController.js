const knex = require('../database');

module.exports = {
  // lista todos os usuarios
  async index(req, res) {
    const results = await knex('users')
      // só aparecerá os que não foram 'deletados'
      .where('deleted_at', null);
    return res.json(results);
  },

  // cria usuario
  async create(req, res, next) {
    try {
      const { username } = req.body;

      await knex('users').insert({
        username,
      });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  // atualiza um usuario
  async update(req, res, next) {
    try {
      const { username } = req.body;
      const { id } = req.params;

      await knex('users').update({ username }).where({ id });

      return res.send();
    } catch (error) {
      next(error);
    }
  },

  // delete um usuario
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await knex('users').where({ id }).update('deleted_at', new Date()); // 'falso delete'
      // .del();

      return res.send();
    } catch (error) {
      next(error);
    }
  },
};

// argumento next -> para capturar o erro, caso dê
