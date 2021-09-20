const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const CreateUser = async(req, res = response) => {
    const { name, password } = req.body;

    try {
        let user = await User.findOne({ name });
        if(user){
            return res.status(400).json({
                status: false,
                response: 'Username already exist'
            });
        }
        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            response: 'Error detected: API failure.'
        });
    }
}
