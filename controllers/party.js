const { response } = require('express');
const Party = require('../models/Party');
const PartyUsers = require('../models/PartyUsers');
const User = require('../models/User');

const CreateParty = async(req, res = response) => {
    const { 
        leader, 
        typeQuestions, 
        players, 
        timeQuestions
    } = req.body;
    const partycode = Math.random().toString(19).slice(-8).toUpperCase();

    console.log('El body que recibimos', req.body)
    try {
        let PartyCode = await Party.findOne({ partycode });

        if(PartyCode){
            return res.status(500).json({
                status: false,
                msg: 'Error: The party code is already exist'
            });
        }

        let { dataUser } = req.body;
        let { name, id } = dataUser;

        console.log('El name y el id que recigbimos', name, id)
        
        PartyCode = new Party({
            partycode, 
            leader, 
            typeQuestions,
            players,
            timeQuestions
        });
        let PartySave = await PartyCode.save();
        PartySave.id = PartySave._id;
        
        const userData = await User.findOneAndUpdate({ name }, { inparty: true, inpartyid: PartySave.id });

        const PartyCodeUpdate = new PartyUsers({
            PartyCode: partycode,
            Party: PartySave._id
        });
        PartyCodeUpdate.Users = dataUser.id;
        await PartyCodeUpdate.save();

        let UsersList = await PartyUsers.findOne({ PartyCode: partycode }).populate('Users', 'name');
        const { Users } = UsersList; 

        res.status(201).json({
            status: true,
            PartySave,
            Users,
            userData
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

    console.log(req.body)

    try {
        let ValidPartyCode = await Party.findOne({ partycode });

        console.log('Aca es el Validpartycode', ValidPartyCode)

        if(!ValidPartyCode){
            return res.status(400).json({
                status: false,
                msg: 'The partycode does not exist in the database'
            });
        }

        const PartyUpdate = await PartyUsers.findOne({ PartyCode: partycode });

        console.log('Aca es el PartyUsers', PartyUpdate)

        if(!PartyUpdate){
            return res.status(400).json({
                status: false,
                msg: 'The Party does not exist in the database'
            });
        }

        const { id, name } = req.body;
        await PartyUpdate.Users.push(id);
        await PartyUpdate.save();
        let PartySave = await Party.findOne({ partycode });
        console.log('Aca es el buscar por partycode, PartySave', PartySave)
        const userData = await User.findOneAndUpdate({ name }, { inparty: true, inpartyid: PartySave.id });
        console.log('El Userdata', userData)
        let UsersList = await PartyUsers.findOne({ PartyCode: partycode }).populate('Users', 'name');
        const { Users } = UsersList; 
        console.log('Aca es el UserList', Users)


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