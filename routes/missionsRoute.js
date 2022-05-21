const router = require('express').Router();
const missionsController = require('../controllers/missionsController');

router 
    .route('/')
    .get(missionsController.index)
    .post(missionsController.addMission);



module.exports = router;