const knex = require('knex')(require('../knexfile').development);

// [ROUTE] - "/missions"
// [GET] - Retrieves all missions 
exports.index = (_req, res) => {
    knex('missions')
      .select('id', 'city', 'state', 'date', 'status','clientID')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).send(`Error retrieving Missions ${err}`));
};

// [POST] - Creates new mission
exports.addMission = (req, res) => {
    // Validate the request body for required data
    knex('missions')
      .insert(req.body)
      .then((data) => {
        // For POST requests we need to respond with 201 and the location of the newly created record
        // const newMissionURL = `/missions/${data[0]}`;
        // res.status(201).location(newMissionURL).send(newMissionURL);
        res.status(201).send(`Success: New Mission - ${data}`)
      })
      .catch((err) => res.status(400).send(`Error creating Mission: ${err}`));
  };