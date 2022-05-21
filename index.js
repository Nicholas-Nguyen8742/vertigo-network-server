require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const authRoute = require('./routes/authRoute');
const missionsRoute = require('./routes/missionsRoute');


app.use(cors());
app.use(express.json());



app.use('/auth', authRoute);
app.use('/missions', missionsRoute);

app.listen(PORT, () => {
    console.log("Vertigooo!!!");
});