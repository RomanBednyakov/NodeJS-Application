const express = require('express');
const router = express.Router();
const followers = require('../controller/followers');
const authUser = require('../passportJs/index').authUser;

router.post('/', function (req, res) {
    authUser(req,res);
    followers(req, res);
});

module.exports = router;