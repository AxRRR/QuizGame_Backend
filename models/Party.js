const { Schema, model } = require('mongoose');

const PartySchema = Schema({
    partycode: {
        type: String
    },
    leader: {
        type: String,
        required: true
    },
    typeQuestions: {
        type: Number,
        required: true
    },
    players: {
        type: Number,
        required: true
    },
    timeQuestions: {
        type: Number,
        required: true
    },
    statusServer: {
        type: Boolean
    }
});


module.exports = model('Party', PartySchema );