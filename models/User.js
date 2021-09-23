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