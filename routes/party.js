const { Router } = require('express');
const { check } = require('express-validator');
const { CreateParty, JoinParty } = require('../controllers/party');
const { CheckFields } = require('../middlewares/CheckFields');


const router = Router();

router.post('/new', [
    check('leader', 'The leader is empty').not().isEmpty(),
    CheckFields
    ],
    CreateParty
);

router.put('/join', [
    check('id', 'The id is empty').not().isEmpty(),
    CheckFields
    ],
    JoinParty
);


module.exports = router;