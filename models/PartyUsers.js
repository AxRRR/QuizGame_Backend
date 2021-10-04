const { Schema, model } = require('mongoose');

const PartyUsers = Schema({
    PartyCode: {
        type: String
    },
    Party: { 
        type: Schema.Types.ObjectId, 
        ref: 'Party' 
    },
    Users: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }]
});


module.exports = model('PartyUsers', PartyUsers );