const router = require('express').Router();
const pilotsController = require('../controllers/pilotsController');

router 
    .route('/')
    .get(pilotsController.index);

router
    .route('/:id')
    .get(pilotsController.singlePilot)
    .put(pilotsController.updatePilot)
    .delete(pilotsController.deletePilot);

router 
    .route('/:id/portfolio')
    .get(pilotsController.indexPortfolio)
    .post(pilotsController.addPortfolio);

router
    .route('/portfolio/:portfolioID')
    .get(pilotsController.singlePortfolio)
    .put(pilotsController.editPortfolio)
    .delete(pilotsController.deletePortfolio);

router 
    .route('/:id/reviews')
    .get(pilotsController.indexReviews)
    .post(pilotsController.addReview);

router 
    .route('/:id/reviews/:reviewID')
    .get(pilotsController.singleReview)
    .put(pilotsController.editReview)
    .delete(pilotsController.deleteReview);

router
    .route('/:id/applications')
    .get(pilotsController.indexApplications)
    .post(pilotsController.addApplication);

router
    .route('/:id/applications/:appID')
    .get(pilotsController.singleApplication)
    .put(pilotsController.updateApplication)
    .delete(pilotsController.deleteApplication);

module.exports = router;