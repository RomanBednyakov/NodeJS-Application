const express = require('express');
const router = express.Router();
const friends = require('../controller/friends');
const authUser = require('../passportJs/index').authUser;

router.post('/', function (req, res) {
    authUser(req,res);
    friends(req, res);
});

module.exports = router;