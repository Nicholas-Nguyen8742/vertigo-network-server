const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');


// [ROUTE] - "/auth/register"
// [POST] - Creates new user through registration
exports.register = (req, res) => {
    const { firstName, lastName, email, type, city, state, password, profile } = req.body;

    // if (!firstName || !lastName || !email || !type || !city || !state || !password) {
    //     return res.status(400).send("Please enter the required fields.");
    // }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = {
        type: type,
        firstName: firstName, 
        lastName: lastName, 
        email: email, 
        city: city, 
        state: state,
        password: hashedPassword,
        profile: profile
    };

    knex('users')
        .insert(user)
        .then(() => {
            res.status(201).send("Registered successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Failed registration");
        });
};


// [ROUTE] - "/auth/login"
// [POST] - Creates & sends JWT for user authorization
exports.login = (req, res) => {
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

            res.json({ token, user });
        })
        .catch(() => {
            res.status(400).send("Invalid credentials");
        });
};


// [ROUTE] - "/auth/current"
// [GET] - Gets currently logged in user to validate JWT authentication
exports.current = (authenticate, (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Please login");
    }

    // Parse the Bearer token
    const authToken = req.headers.authorization.split(" ")[1];
    
    // Verify the token
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send("Invalid auth token");
        }

        knex('users')
            .where({ email: decoded.email })
            .first()
            .then((user) => {
                // Respond with the user data
                delete user.password;
                res.json(user);
            });
    });
});

