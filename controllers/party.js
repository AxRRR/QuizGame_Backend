const { response } = require('express');
const Party = require('../models/Party');

const CreateParty = async(req, res = response) => {
    const { leader, typeQuestions, players, timeQuestions } = req.body;

    
    const partycode = Math.random().toString(19).slice(-8).toUpperCase();
    console.log(partycode, req.body)

    try {
        let PartyCode = await Party.findOne({ partycode });
        console.log(PartyCode)

        if(PartyCode){
            return res.status(500).json({
                status: false,
                msg: 'Error: The party code is already exist'
            })
        }

        console.log(partycode, leader, players)
        PartyCode = new Party({
            partycode, 
            leader, 
            typeQuestions,
            players,
            timeQuestions
        });
        await PartyCode.save();

        res.status(201).json({
            status: true,
            partycode,
            leader,
            players

        })


    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'API FAULER'
        })
    }

}

module.exports = {
    CreateParty
}