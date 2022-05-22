require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const authRoute = require('./routes/authRoute');
const missionsRoute = require('./routes/missionsRoute');


app.use(cors());
app.use(express.json());


// Routes 
app.use('/auth', authRoute);
app.use('/missions', missionsRoute);
app.use('/applications', applicationsRoute);

app.listen(PORT, () => {
    console.log("Vertigooo!!!");
});