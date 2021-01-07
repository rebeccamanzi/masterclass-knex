const knex = require('../database');

module.exports = {
  
  // lista todos os projetos
  async index(req, res, next) {
    try {
      const results = await knex('projects');
      return res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

// argumento next -> para capturar o erro, caso dê
