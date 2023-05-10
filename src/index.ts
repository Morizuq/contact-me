const express = require("express");
const mongoose = require('mongoose')

require('dotenv').config();

const mail = require('./router');

const app = express();

const port = process.env.PORT || 3412;

app.use(express.json())

app.use('/api/v1/mail', mail)


const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Listening on ${port}`));
    } catch (error) {
        console.log(error)
    }
}

//Start the server after connecting to the database
start();
