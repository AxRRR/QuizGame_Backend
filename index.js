const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

const app = express();

dbConnection();

app.use(cors());

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/party', require('./routes/party'));

app.listen( 4000, () => {
    for (let index = 0; index < 5; index++) {
        console.log('')
    }
    console.log('         Application is running now in')
    console.log(`         http://localhost:${process.env.PORT}/api/`)
})