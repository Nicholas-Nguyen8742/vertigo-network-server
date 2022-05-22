const knex = require('knex')(require('../knexfile').development);

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

// [ROUTE] - '/pilots/:id/reviews'
// [GET] - Retrieves all reviews of pilot
exports.indexReviews = (req, res) => {
    knex('reviews')
      .where({ authorID: req.params.id })
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