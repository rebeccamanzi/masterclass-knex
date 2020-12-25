const knex = require('../database');

module.exports = {
  async index(req, res) {
    const results = await kenx('users');

    return res.json(results);
  },
};
