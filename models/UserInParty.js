const { Schema, model } = require('mongoose');

const UserInPartySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: Number,
        required: true
    },
    profileimg: {
        type: String,
    },
    Party: { 
        type: Schema.Types.ObjectId, 
        ref: 'Party' 
    },
    Users: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }
});


module.exports = model('UserInParty', UserInPartySchema );