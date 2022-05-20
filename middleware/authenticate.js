const jwt = require('jsonwebtoken');

// - Expected headers: { Authorization: "Bearer JWT_TOKEN_HERE" }
const authenticate = (req, res, next) => {
    // If there is no auth header provided
    if (!req.headers.authorization) {
        return res.status(401).send("Please login");
    }

    // Parse the Bearer token
    const authToken = req.headers.authorization.split(" ")[1];
    
    // Verify the token
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
        // Sends 401 status if JWT not valid
        if (err) {
            return res.status(401).send("Invalid auth token");
        } 

        req.user = decoded;
        next();
    }); 
};

module.exports = authenticate;
