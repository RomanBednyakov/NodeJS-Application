let express = require('express');
const router = express.Router();
const passport = require('../passportJs/index').passportJs;
const authUser = require('../passportJs/index').authUser;
const search = require('../controller/search');

router.get('/auth', passport.authenticate('jwt', { session: false}), function (req, res) {
    res.json({message: "ok", user : req.user});
});

router.get('/search', function (req, res) {
    authUser(req,res);
    search(req, res);
});


module.exports = router;
