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
const User = require('./models/User');

dbConnection();

app.use(cors());

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/party', require('./routes/party'));

io.on('connection', (socket) => {
    socket.on('join', async(PartyCode, isInPartyUser, PartyId) => {
        console.log(PartyCode, isInPartyUser, PartyId);

        if(isInPartyUser === false){
            return console.log('El isInParty es false, return.')
        }

        const PartyUserSaved = await User.findOne({ inpartyid: PartyId });
        console.log('if PartyUserSaved ===' + PartyUserSaved.inpartyid + ' el valor es: ' + PartyId)
        if(PartyUserSaved.inpartyid == PartyId){
            // let UsersList = await PartyUsers.findOne({ PartyCode }).populate('Users', 'name');
            let PartySave = await Party.findOne({ partycode: PartyCode });
            let UsersList = await PartyUsers.findOne(PartySave._id).populate('Users', 'name');
            const { Users } = UsersList; 

            io.emit('userlist', JSON.stringify({Users}));
            // io.emit('userlist', () => {
            //     JSON.stringify({Users})
            // });

            console.log('El userList queda asi: ', Users)
        }
        else {
            console.log('El partyid del user no coniciden')
        }
       
    });
});

http.listen( 4000, () => {
    for (let index = 0; index < 5; index++) {
        console.log('')
    }
    console.log('         Application is running now in')
    console.log(`         http://localhost:${process.env.PORT}/api/`)
})