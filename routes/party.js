const { Router } = require('express');
const { check } = require('express-validator');
const { CreateParty } = require('../controllers/party');
const { CheckFields } = require('../middlewares/CheckFields');


const router = Router();

router.post('/new', [
        check('leader', 'The leader is empty').not().isEmpty(),
        CheckFields
    ],
    CreateParty
);

module.exports = router;