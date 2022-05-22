const knex = require('knex')(require('../knexfile').development);

// [ROUTE] - '/pilots'
// [GET] - Retrieve all pilots


// [ROUTE] - '/pilots/:id'
// [GET] - Retrieves single pilot data


// [PUT] - Edits single pilot data


// [DELETE] - Deletes single pilot data


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

