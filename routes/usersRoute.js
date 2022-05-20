const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// [ROUTE] - "/users/register"
// [POST] - Creates new user through registration
router.post('/register', (req, res) => {
    const { firstName, lastName, email, type, city, state, password } = req.body;

    if (!firstName || !lastName || !email || !type || !city || !state || !password) {
        return res.status(400).send("Please enter the required fields.");
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = {
        type: type,
        firstName: firstName, 
        lastName: lastName, 
        email: email, 
        city: city, 
        state: state,
        password: hashedPassword
    };

    knex('users')
        .insert(newUser)
        .then(() => {
            res.status(201).send("Registered successfully");
        })
        .catch(() => {
            res.status(400).send("Failed registration");
        });
});





module.exports = router;