const { Router } = require('express');
const { check } = require('express-validator');
const { CheckFields } = require('../middlewares/CheckFields');
const { CreateUser, LoginUser, LoginUserGoogle } = require('../controllers/auth');


const router = Router();

router.post('/register', [
        check('name', 'The user name is empty').not().isEmpty(),
        check('password', 'The password is empty').isLength({ min: 5 }),
        CheckFields
    ],
    CreateUser
);

router.post('/login', [
    check('name', 'Username or password incorrect').not().isEmpty(),
    check('password', 'Username or password incorrect').not().isEmpty(),
    check('profileimg', 'Username or password incorrect'),
    CheckFields
],
    LoginUser
);

router.post('/logingoogle', [
    check('name', 'Username or password incorrect').not().isEmpty(),
    check('password', 'Username or password incorrect').not().isEmpty(),
    check('profileimg', 'Username or password incorrect').not().isEmpty(),
    CheckFields
],
    LoginUserGoogle
);

module.exports = router;