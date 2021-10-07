const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const app = express();
const http = require('http').createServer(app);
const io = require("socket.io")(http, {
    cors: {
      origin: '*',
      methods: ['*']
    }
});
const Party = require('./models/Party');
const PartyUsers = require('./models/PartyUsers');

dbConnection();

app.use(cors());

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/party', require('./routes/party'));

io.on('connection', (socket) => {
    socket.on('join', async(arg) => {
        console.log(arg);
        let PartySave = await Party.findOne({ arg });
        let UsersList = await PartyUsers.findOne(PartySave._id).populate('Users', 'name');
        const { Users } = UsersList; 
        // io.emit('userlist', 'El retorno es este: ' + arg)
        io.emit('userlist', JSON.stringify({Users}));
        io.emit('userlist', () => {
            JSON.stringify({Users})
        });
    });
});

http.listen( 4000, () => {
    for (let index = 0; index < 5; index++) {
        console.log('')
    }
    console.log('         Application is running now in')
    console.log(`         http://localhost:${process.env.PORT}/api/`)
})