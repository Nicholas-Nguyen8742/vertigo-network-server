const knex = require('knex')(require('../knexfile'));

// [ROUTE] - '/clients'
// [GET] - Retrieve all clients
exports.index = (_req, res) => {
    knex('users')
      .where({ type: 'Client' })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).send(`Error retrieving Clients ${err}`));
};

// [ROUTE] - '/clients/:id'
// [GET] - Retrieves single Client data
exports.singleClient = (req, res) => {
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
        res.status(400).send(`Error retrieving Client ${req.params.id} ${err}`)
      );
};

// [PUT] - Edits single Client data
exports.updateClient = (req, res) => {
    // Validate the request body for required data
  
    knex('users')
      .update(req.body)
      .where({ id: req.params.id })
      .then(() => {
        res.status(200).send(`Client with id: ${req.params.id} has been updated`);
      })
      .catch((err) =>
        res.status(400).send(`Error updating Client ${req.params.id} ${err}`)
      );
};

// [DELETE] - Deletes single client data
exports.deleteClient = (req, res) => {
    knex('users')
      .del()
      .where({ id: req.params.id })
      .then(() => {
        // For DELETE response we can use 204 status code
        res.status(204).send(`Client with id: ${req.params.id} has been deleted`);
      })
      .catch((err) =>
        res.status(400).send(`Error deleting Client ${req.params.id} ${err}`)
      );
};


// [ROUTE] - '/clients/:id/missions'
// [GET] - Retrieves all missions by client
exports.indexMissions = (req, res) => {
  knex('missions')
    .where({ clientID: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(
          `Error retrieving Missions for Client ${req.params.id} ${err}`
        )
    );
};

// [POST] - Adds Mission listing by client
exports.addMission = (req, res) => {
  // Validate the request body for required data


  knex('missions')
    .insert(req.body)
    .then((data) => {
      // For POST requests we need to respond with 201 and the location of the newly created record
      res.status(201).send(`Success: Mission added ${data}`);
    })
    .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};


// [ROUTE] - '/clients/:id/missions/:missionID'
// [GET] - Gets single mission of client
exports.singleMission = (req, res) => {
  knex('missions')
    .where({ missionID: req.params.missionID })
    .then((data) => {
      // If record is not found, respond with 404
      if (!data.length) {
        return res.status(404).send(`Mission with id: ${req.params.missionID} is not found`);
      }

      // Knex returns an array of records, so we need to send response with a single object only
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Mission ${req.params.missionID} ${err}`)
    );
};


// [PUT] - Edits single mission
exports.editMission = (req, res) => {
  // Validate the request body for required data

  knex('missions')
    .update(req.body)
    .where({ missionID: req.params.id })
    .then(() => {
      res.status(200).send(`Mission with id: ${req.params.missionID} has been updated`);
    })
    .catch((err) =>
      res.status(400).send(`Error updating Mission ${req.params.missionID} ${err}`)
    );
};

// [DELETE] - Deletes mission listing
exports.deleteMission = (req, res) => {
  knex('missions')
    .del()
    .where({ missionID: req.params.missionID })
    .then(() => {
      // For DELETE response we can use 204 status code
      res.status(204).send(`Mission with id: ${req.params.missionID} has been deleted`);
    })
    .catch((err) =>
      res.status(400).send(`Error deleting Mission ${req.params.missionID} ${err}`)
    );
};


// [ROUTE] - '/clients/:id/reviews'
// [GET] - Retrieves all reviews of client
exports.indexReviews = (req, res) => {
    knex('reviews')
      .where({ authorID: req.params.id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving reviews written by Client ${req.params.id} ${err}`)
      );
};

// [POST] - Add Review as Author (Client)
exports.addReview = (req, res) => {
    // Validate the request body for required data

  
    knex('reviews')
      .insert(req.body)
      .then((data) => {
        // For POST requests we need to respond with 201 and the location of the newly created record
        res.status(201).send(`Success: Review added ${data}`);
      })
      .catch((err) => res.status(400).send(`Error creating Review: ${err}`));
};


// [ROUTE] - '/clients/:id/reviews/:reviewID'
// [GET] - Gets single review of Client (author)
exports.singleReview = (req, res) => {
    knex('reviews')
      .where({ id: req.params.reviewID })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving review written by Client ${req.params.reviewID} ${err}`)
      );
};

// [PUT] - Updates single review Client (author)
exports.editReview = (req, res) => {
    // Validate the request body for required data
    
  
    knex('reviews')
      .update(req.body)
      .where({ id: req.params.reviewID })
      .then(() => {
        res.status(200).send(`Review with id: ${req.params.reviewID} has been updated`);
      })
      .catch((err) =>
        res.status(400).send(`Error updating Review ${req.params.reviewID} ${err}`)
      );
};

// [DELETE] - Deletes single review Client (author)
exports.deleteReview = (req, res) => {
    knex('reviews')
      .del()
      .where({ id: req.params.reviewID })
      .then(() => {
        // For DELETE response we can use 204 status code
        res.status(204).send(`Review with id: ${req.params.reviewID} has been deleted`);
      })
      .catch((err) =>
        res.status(400).send(`Error deleting Review ${req.params.reviewID} ${err}`)
      );
};


// [ROUTE] - '/clients/:id/missions/:missionID/applications/:appID'
// [GET] - Retrieves one application of single mission
exports.singleApplication = (req, res) => {
    knex('applications')
      .where({ id: req.params.appID })
      .then((data) => {
        // If record is not found, respond with 404
        if (!data.length) {
          return res.status(404).send(`Application with id: ${req.params.appID} is not found`);
        }
  
        // Knex returns an array of records, so we need to send response with a single object only
        res.status(200).json(data[0]);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving Application ${req.params.appID} ${err}`)
      );
};

// [PUT] - Edits status of one application of single mission by Client
exports.editApplicationStatus = (req, res) => {
    // Validate the request body for required data
      
    knex('applications')
        .update(req.body)
        .where({ id: req.params.appID })
        .then(() => {
            res.status(200).send(`Application with id: ${req.params.appID} has been updated`);
        })
        .catch((err) =>
            res.status(400).send(`Error updating Application ${req.params.appID} ${err}`)
        );

};