require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middleware/ErrorMiddleware');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname,'static')));
app.use('/api', router);
app.use(errorMiddleware);


const PORT = process.env.PORT || 4000;


const start = () => {
    try {
        sequelize.authenticate();
        sequelize.sync();
        app.listen(PORT, () => {
            console.log('Server started on port', PORT);
        })
    } catch (e) {
        console.log(e);
    }

}

start();