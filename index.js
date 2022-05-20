require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.port || 8080;
const usersRoute = require('./routes/usersRoute');
// const pilotsRoute = require('./routes/pilotRoute');
// const clientRoute = require('./routes/clientRoute');

app.use(cors());
app.use(express.json());


// User Routes
app.user('/users', usersRoute);
// app.use('/pilots', pilotsRoute);
// app.use('/client', clientRoute);

app.listen(PORT, () => {
    console.log("Vertigooo!!!");
});