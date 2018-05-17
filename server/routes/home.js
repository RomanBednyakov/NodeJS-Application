let express = require('express');
const router = express.Router();
const home = require('../controller/home');
let passport = require('../passportJs/index').passportJs;

router.get('/', passport.authenticate('jwt', { session: false}), function (req, res) {
    home(req, res);
});


module.exports = router;