const router = require('express').Router();
const clientsController = require('../controllers/clientsController');

router 
    .route('/')
    .get(clientsController.index);

router
    .route('/:id')
    .get(clientsController.singleClient)
    .put(clientsController.updateClient)
    .delete(clientsController.deleteClient);

router 
    .route('/:id/reviews')
    .get(clientsController.indexReviews)
    .post(clientsController.addReview);

router 
    .route('/:id/reviews/:reviewID')
    .get(clientsController.singleReview)
    .put(clientsController.editReview)
    .delete(clientsController.deleteReview);

router
    .route('/:id/missions')
    .get(clientsController.indexMissions)
    .post(clientsController.addMission);

router 
    .route('/:id/missions/:missionID')
    .get(clientsController.singleMission)
    .put(clientsController.editMission)
    .delete(clientsController.deleteMission);

router
    .route('/:id/missions/:missionID/applications/:appID')
    .get(clientsController.singleApplication)
    .put(clientsController.editApplicationStatus);

module.exports = router;