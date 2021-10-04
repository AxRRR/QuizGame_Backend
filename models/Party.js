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
    },
    id: {
        type: Number,
        // required: true
    },
    name: {
        type: String,
        // require: true
    },
    profileimg: {
        type: String
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }]
});


module.exports = model('Party', PartySchema );