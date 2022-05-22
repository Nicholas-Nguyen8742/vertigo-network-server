const knex = require('knex')(require('../knexfile').development);

// [ROUTE] - "/applications"
// [GET] - Retrieves all applications
exports.index = (_req, res) => {
    knex('applications')
      .select('id', 'status', 'missionID', 'pilotID')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).send(`Error retrieving Mission Applications ${err}`));
};