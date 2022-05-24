const router = require('express').Router();
const authController = require('../controllers/authController');

router
    .route('/register')
    .post(authController.register);

router
    .route('/login')
    .post(authController.login);

router 
    .route('/current')
    .get(authController.current);

// router 
//     .route('/logout')
//     .get(authController.logout);

module.exports = router;