const knex = require('knex')(require('../knexfile').development);

// [ROUTE] - /missions
// [GET] - 
exports.index = (_req, res) => {
    knex('warehouse')
      .select('id', 'name', 'manager')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).send(`Error retrieving Warehouses ${err}`));
  };