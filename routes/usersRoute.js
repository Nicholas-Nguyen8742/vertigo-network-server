const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

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

// [ROUTE] - "/users/login"
// [POST] - Creates & sends JWT for user authorization
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).send("Please enter the required fields.");
    }

    // Find the user
    knex('users')
        .where({ email: email })
        .first()
        .then((user) => {
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(400).send("Password for this user does not exist!");
            }

            // Create a token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_KEY,
                { expiresIn: "24h" }
            );

            res.json({ token });
        })
        .catch(() => {
            res.status(400).send("Invalid credentials");
        });
});

// [ROUTE] - "/users/current"
// [GET] - Gets currently logged in user to validate JWT authentication
router.get('/current', authenticate, (req, res) => {
    knex('users')
        .where({ email: req.user.email })
        .first()
        .then((user) => {
            // Respond with the user data
            delete user.password;
            res.json(user);
        });
});



module.exports = router;