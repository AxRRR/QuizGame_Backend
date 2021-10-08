const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    inparty: {
        type: Boolean
    },
    inpartyid: { 
        type: Schema.Types.ObjectId, 
        ref: 'Party' 
    },
    profileimg: {
        type: String,
    },
    wins: {
        type: Number,
    },
    losses: {
        type: Number,
    },
    versuswin: {
        type: Number,
    },
    grupwin: {
        type: Number,
    },
    score: {
        type: Number,
    }
});


module.exports = model('User', UserSchema );