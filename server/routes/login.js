const express = require('express');
const router = express.Router();
const login = require('../controller/login');

router.post('/', function (req, res) {
    login(req, res);
});

module.exports = router;