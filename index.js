require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const authRoute = require('./routes/authRoute');
const missionsRoute = require('./routes/missionsRoute');
const applicationsRoute = require('./routes/applicationsRoute');
const pilotsRoute = require('./routes/pilotsRoute');
const clientsRoute = require('./routes/clientsRoute');


app.use(cors());
app.use(express.json());


// Routes 
app.use('/auth', authRoute);
app.use('/pilots',pilotsRoute);
app.use('/clients', clientsRoute);
app.use('/missions', missionsRoute);
app.use('/applications', applicationsRoute);

app.listen(PORT, () => {
    console.log("Vertigooo!!!");
});