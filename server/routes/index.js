let express = require('express');
let login = require('./login');
let home = require('./home');
let passport = require('../passportJs/index').passportJs;
let registrationUser = require('./registration');

const router = express.Router();

router.post('/login', function (req, res) {
    login(req, res);
});

router.get('/home', passport.authenticate('jwt', { session: false}), function (req, res) {
    home(req, res)
});

router.post('/registration', function (req, res) {
    registrationUser(req, res);
});

module.exports = router;