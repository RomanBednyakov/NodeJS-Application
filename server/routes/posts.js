const express = require('express');
const router = express.Router();
const addPost = require('../controller/addPost');
const myPost = require('../controller/myPosts');
const jwt = require('jsonwebtoken');
const config = require('../../server/config/index');

function authUser(req) {
    let user = jwt.verify(req.body.token, config.secretOrKey);
    req.body.userId = user.user;
    delete req.body.token;
}

router.post('/addPost', function (req, res) {
    authUser(req, res);
    addPost(req, res);
});
router.post('/myPost', function (req, res) {
    console.log('##',111);
    authUser(req, res);
    myPost(req, res);
});
router.post('/friendsPost', function (req, res) {
    posts(req, res);
});


module.exports = router;