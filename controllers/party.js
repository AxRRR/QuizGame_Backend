const { response } = require('express');
const Party = require('../models/Party');
const PartyUsers = require('../models/PartyUsers');
const UserInParty = require('../models/UserInParty');

const CreateParty = async(req, res = response) => {
    const { leader, typeQuestions, players, timeQuestions,
        name, id, profileimg } = req.body;

    
    const partycode = Math.random().toString(19).slice(-8).toUpperCase();
    // console.log(partycode, req.body)

    console.log('El body data user\n', req.body)

    try {
        let PartyCode = await Party.findOne({ partycode });
        // console.log(PartyCode)

        if(PartyCode){
            return res.status(500).json({
                status: false,
                msg: 'Error: The party code is already exist'
            })
        }

        console.log(partycode, leader, players)
        console.log('EL id', req.body.dataUser.id)

        let { dataUser } = req.body;

        console.log('Aqui lo que mandamos al partyusers', partycode, dataUser)

        // PartyUsers.Party = PartyCode
        
        
        PartyCode = new Party({
            partycode, 
            leader, 
            typeQuestions,
            players,
            timeQuestions
        });

        PartyCode.users = req.body.dataUser.id;

        let PartySave = await PartyCode.save();

        console.log('ACA EL PARTYSAVEEEEEEEE', PartySave, PartySave.id, PartySave._id)
        ///////////
        
        const PartyCodeUpdate = new PartyUsers({
            PartyCode: partycode,
            Party: PartySave._id
        });

        PartyCodeUpdate.Users = dataUser.id;
        // PartyCodeUpdate.Users = PartySave._id;

        await PartyCodeUpdate.save();

        // PartyCode.users = [{
        //     id: req.body.dataUser.id,
        //     name
        // }]
        // PartyCode.users = name;


        res.status(201).json({
            status: true,
            PartySave
        })


    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'API FAULER'
        })
    }

}

const JoinParty = async(req, res = response) => {
    const { partycode } = req.body;
    console.log('Aca empieza el join', req.body)

    try {
        let ValidPartyCode = await Party.findOne({ partycode });

        if(!ValidPartyCode){
            return res.status(400).json({
                status: false,
                msg: 'The partycode does not exist in the database'
            });
        }

        const PartyUpdate = await PartyUsers.findByIdAndUpdate(partycode, { new: true });
        
        PartyUpdate.Users = [{
            id: req.body.id,
        }]

        res.status(200).json({
            status: true,
            PartyUpdate
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