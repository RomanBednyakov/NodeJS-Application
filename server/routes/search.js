const express = require('express');
const router = express.Router();
const search = require('../controller/search');
const authUser = require('../passportJs/index').authUser;

router.post('/', function (req, res) {
    authUser(req,res);
    search(req, res);
});

module.exports = router;