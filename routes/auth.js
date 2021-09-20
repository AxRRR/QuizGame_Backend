const { Router } = require('express');
const { check } = require('express-validator');
const { CheckFields } = require('../middlewares/CheckFields');

const router = Router();

router.get('/createuser', [
    check('name', 'The user name is empty').not().isEmpty(),
    check('password', 'The password is empty'),
    CheckFields
])