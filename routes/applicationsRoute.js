const router = require('express').Router();
const applicationsController = require('../controllers/applicationsController');

router 
    .route('/')
    .get(applicationsController.index);

module.exports = router;