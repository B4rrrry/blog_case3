require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');

const app = express();


const PORT = process.env.PORT || 4000;


const start = () => {
    try {
        sequelize.authenticate();
        sequelize.sync({force:true});
        app.listen(PORT, () => {
            console.log('Server started on port', PORT);
        })
    } catch (e) {
        console.log(e);
    }

}

start();