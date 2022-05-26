const knex = require('knex')(require('../knexfile'));

// [ROUTE] - '/pilots'
// [GET] - Retrieve all pilots
exports.index = (_req, res) => {
    knex('users')
      .where({ type: 'Pilot' })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).send(`Error retrieving Pilots ${err}`));
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
exports.updatePilot = (req, res) => {
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
exports.deletePilot = (req, res) => {
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
exports.indexPortfolio = (req, res) => {
    knex('portfolio')
      .where({ pilotID: req.params.id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res
          .status(400)
          .send(
            `Error retrieving Portfolio Items for Pilot ${req.params.id} ${err}`
          )
      );
};

// [POST] - Adds a portfolio piece
exports.addPortfolio = (req, res) => {
    // Validate the request body for required data

    
    knex('portfolios')
      .insert(req.body)
      .then((data) => {
        res.status(201).send(`Success adding Portfolio ${data}`);
      })
      .catch((err) => res.status(400).send(`Error creating Portfolio: ${err}`));
};
  

// [ROUTE] - '/pilots/:id/portfolio/:portfolioID'
// [GET] - Retrieves single portfolio for pilot
exports.singlePortfolio = (req, res) => {
    knex('portfolio')
      .where({ id: req.params.portfolioID })
      .then((data) => {
        // If record is not found, respond with 404
        if (!data.length) {
          return res.status(404).send(`Record with id: ${req.params.portfolioID} is not found`);
        }
  
        // Knex returns an array of records, so we need to send response with a single object only
        res.status(200).json(data[0]);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving Portfolio ${req.params.portfolioID} ${err}`)
      );
};

// [PUT] - Edits single portfolio piece of pilot
exports.editPortfolio = (req, res) => {
    // Validate the request body for required data

    knex('portfolio')
      .update(req.body)
      .where({ id: req.params.portfolioID })
      .then(() => {
        res.status(200).send(`Portfolio with id: ${req.params.portfolioID} has been updated`);
      })
      .catch((err) =>
        res.status(400).send(`Error updating Portfolio ${req.params.portfolioID} ${err}`)
      );
};
  

// [DELETE] - Deletes single portfolio piece of pilot
exports.deletePortfolio = (req, res) => {
    knex('portfolio')
      .del()
      .where({ id: req.params.portfolioID })
      .then(() => {
        // For DELETE response we can use 204 status code
        res.status(204).send(`Portfolio with id: ${req.params.portfolioID} has been deleted`);
      })
      .catch((err) =>
        res.status(400).send(`Error deleting Portfolio ${req.params.portfolioID} ${err}`)
      );
};


// [ROUTE] - '/pilots/:id/reviews'
// [GET] - Retrieves all reviews of pilot
exports.indexReviews = (req, res) => {
    knex('reviews')
      .where({ recipientID: req.params.id })
      .join('users', 'reviews.authorID', '=', 'users.id')
      .select('users.firstName', 'users.lastName', 'users.city', 'users.state', 'users.profile', 'reviews.rating', 'reviews.description', 'reviews.timestamp')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving reviews written by Pilot ${req.params.id} ${err}`)
      );
};

// [POST] - Add Review as Author
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


// [ROUTE] - '/pilots/:id/reviews/:reviewID'
// [GET] - Gets single review of pilot (author)
exports.singleReview = (req, res) => {
    knex('reviews')
      .where({ id: req.params.reviewID })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving review written by Pilot ${req.params.reviewID} ${err}`)
      );
};

// [PUT] - Updates single review pilot (author)
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

// [DELETE] - Deletes single review pilot (author)
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


// [ROUTE] - '/pilots/:id/applications'
// [GET] - Retrieves all applications made by Pilot
exports.indexApplications = (req, res) => {
    knex('applications')
        .where({ pilotID: req.params.id })
        .join('missions', 'applications.missionID', '=', 'missions.id' )
        .select('users.firstName', 'users.lastName', 'users.profile', 'users.email', 'missions.latitude', 'missions.longitude', 'missions.specialty', 'missions.city', 'missions.state', 'missions.date', 'missions.timestamp', 'applications.status')
        .join('users', 'missions.clientID', '=', 'users.ID')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving applications for Pilot ${req.params.id} ${err}`)
        );
};

// [POST] - Adds a portfolio piece
exports.addApplication = (req, res) => {
  // Validate the request body for required data
  const application = {
    missionID: req.body.missionID,
    pilotID: req.body.pilotID,
  }
  
  knex('applications')
    .insert(application)
    .then((data) => {
      res.status(201).send(`Success adding Application ${data}`);
    })
    .catch((err) => res.status(400).send(`Error creating Application: ${err}`));
};



// [ROUTE] - '/pilots/:id/applications/:appID'
// [GET] - Retrieve pilot's single application
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

// [PUT] - Edits single application
exports.updateApplication = (req, res) => {
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

// [DELETE] - Deletes single application
exports.deleteApplication = (req, res) => {
    knex('applications')
      .del()
      .where({ id: req.params.appID })
      .then(() => {
        // For DELETE response we can use 204 status code
        res.status(204).send(`Application with id: ${req.params.appID} has been deleted`);
      })
      .catch((err) =>
        res.status(400).send(`Error deleting Application ${req.params.appID} ${err}`)
      );
};