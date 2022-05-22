const knex = require('knex')(require('../knexfile').development);

// [ROUTE] - '/pilots'
// [GET] - Retrieve all pilots
exports.index = (_req, res) => {
    knex('users')
      .where({ type: 'Pilot' })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).send(`Error retrieving Warehouses ${err}`));
};

// [ROUTE] - '/pilots/:id'
// [GET] - Retrieves single pilot data
exports.singlePilot = (req, res) => {
    knex('users')
      .where({ id: req.params.id })
      .then((data) => {
        // If record is not found, respond with 404
        if (!data.length) {
          return res.status(404).send(`Record with id: ${req.params.id} is not found`);
        }
  
        // Knex returns an array of records, so we need to send response with a single object only
        res.status(200).json(data[0]);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving Pilot ${req.params.id} ${err}`)
      );
  };

// [PUT] - Edits single pilot data
exports.updateWarehouse = (req, res) => {
    // Validate the request body for required data
  
    knex('users')
      .update(req.body)
      .where({ id: req.params.id })
      .then(() => {
        res.status(200).send(`Pilot with id: ${req.params.id} has been updated`);
      })
      .catch((err) =>
        res.status(400).send(`Error updating Pilot ${req.params.id} ${err}`)
      );
};

// [DELETE] - Deletes single pilot data
exports.deleteWarehouse = (req, res) => {
    knex('users')
      .del()
      .where({ id: req.params.id })
      .then(() => {
        // For DELETE response we can use 204 status code
        res.status(204).send(`Pilot with id: ${req.params.id} has been deleted`);
      })
      .catch((err) =>
        res.status(400).send(`Error deleting Pilot ${req.params.id} ${err}`)
      );
};

// [ROUTE] - '/pilots/:id/portfolio'
// [GET] - Retrieves pilot's portfolio


// [POST] - Adds a portfolio piece


// [ROUTE] - '/pilots/:id/portfolio/:id'
// [GET] - Retrieves single portfolio for pilot


// [PUT] - Edits single portfolio piece of pilot


// [DELETE] - Deletes single portfolio piece of pilot



// [ROUTE] - '/pilots/:id/reviews'
// [GET] - Retrieves all reviews of pilot


// [ROUTE] - '/pilots/:id/reviews/:id'
// [GET] - Gets single review of pilot (author)


// [PUT] - Updates single review pilot (author)


// [DELETE] - Deletes single review pilot (author)



// [ROUTE] - '/pilots/:id/applications'
// [GET] - Retrieves all applications made by Pilot



// [ROUTE] - '/pilots/:id/applications/:appID'
// [GET] - Retrieve pilot's single application


// [PUT] - Edits single application


// [DELETE] - Deletes single application

