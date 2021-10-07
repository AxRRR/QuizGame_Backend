const { response } = require('express');
const Party = require('../models/Party');
const PartyUsers = require('../models/PartyUsers');

const CreateParty = async(req, res = response) => {
    const { 
        leader, 
        typeQuestions, 
        players, 
        timeQuestions
    } = req.body;
    const partycode = Math.random().toString(19).slice(-8).toUpperCase();

    try {
        let PartyCode = await Party.findOne({ partycode });

        if(PartyCode){
            return res.status(500).json({
                status: false,
                msg: 'Error: The party code is already exist'
            });
        }

        let { dataUser } = req.body;
        
        PartyCode = new Party({
            partycode, 
            leader, 
            typeQuestions,
            players,
            timeQuestions
        });
        let PartySave = await PartyCode.save();
        PartySave.id = PartySave._id;
        
        const PartyCodeUpdate = new PartyUsers({
            PartyCode: partycode,
            Party: PartySave._id
        });
        PartyCodeUpdate.Users = dataUser.id;
        await PartyCodeUpdate.save();

        let UsersList = await PartyUsers.findOne(PartySave._id).populate('Users', 'name');
        const { Users } = UsersList; 

        res.status(201).json({
            status: true,
            PartySave,
            Users
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'API FAULER'
        })
    }

}

const JoinParty = async(req, res = response) => {
    const { partycode } = req.body;

    try {
        let ValidPartyCode = await Party.findOne({ partycode });

        console.log('Aca es el Validpartycode', Party)

        if(!ValidPartyCode){
            return res.status(400).json({
                status: false,
                msg: 'The partycode does not exist in the database'
            });
        }

        const PartyUpdate = await PartyUsers.findOne({ partycode });

        if(!PartyUpdate){
            return res.status(400).json({
                status: false,
                msg: 'The Party does not exist in the database'
            });
        }

        const { id } = req.body;
        await PartyUpdate.Users.push(id);
        await PartyUpdate.save();
        let PartySave = await Party.findOne({ partycode });
        let UsersList = await PartyUsers.findOne(PartySave._id).populate('Users', 'name');
        const { Users } = UsersList; 


        res.status(200).json({
            status: true,
            PartySave,
            Users
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'API FAULER'
        })
    }
}

module.exports = {
    CreateParty,
    JoinParty
}