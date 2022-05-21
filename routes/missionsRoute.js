const router = require('express').Router();
const missionsController = require('../controllers/missionsController');

router 
    .route('/')
    .get(missionsController.index)
    .post(missionsController.addMission);

router 
    .route('/:id')
    .get(missionsController.singleMission)
    .put(missionsController.updateMission)
    .delete(missionsController.deleteMission);

router
    .route('/:id/applications')
    .get(missionsController.missionApplications);

module.exports = router;