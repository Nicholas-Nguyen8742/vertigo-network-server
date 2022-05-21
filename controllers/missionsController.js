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

// [ROUTE] - "/missions/:id"
// [GET] - Retrieves data of just one mission
exports.singleMission = (req, res) => {
    knex('missions')
      .where({ id: req.params.id })
      .then((data) => {
        // If record is not found, respond with 404
        if (!data.length) {
          return res.status(404).send(`Mission with id: ${req.params.id} is not found`);
        }
  
        // Knex returns an array of records, so we need to send response with a single object only
        res.status(200).json(data[0]).send(`Success: Mission ${req.params,id} Found`);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving mission ${req.params.id} ${err}`)
      );
  };

// [PUT] - Edits selected mission data
exports.updateMission = (req, res) => {
    // Validate the request body for required data
    if (!req.body.city || !req.body.state || !req.body.date || !req.body.status ) {
      return res.status(400).send('Please make sure to provide city, state, date, and status fields in a request');
    }
  
    knex('missions')
      .update(req.body)
      .where({ id: req.params.id })
      .then(() => {
        res.status(200).send(`Mission with id: ${req.params.id} has been updated`);
      })
      .catch((err) =>
        res.status(400).send(`Error updating Mission ${req.params.id} ${err}`)
      );
};

// [DELETE] - Deletes data of one mission 
exports.deleteMission = (req, res) => {
    knex('missions')
      .del()
      .where({ id: req.params.id })
      .then(() => {
        // For DELETE response we can use 204 status code
        res.status(204).send(`Mission with id: ${req.params.id} has been deleted`);
      })
      .catch((err) =>
        res.status(400).send(`Error deleting Mission ${req.params.id} ${err}`)
      );
};

