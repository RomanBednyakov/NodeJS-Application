const express = require('express');
const router = express.Router();
const addPost = require('../controller/addPost');
const myPost = require('../controller/myPosts');
const authUser = require('../passportJs/index').authUser;

router.post('/addPost', function (req, res) {
    authUser(req, res);
    addPost(req, res);
});
router.post('/myPost', function (req, res) {
    authUser(req, res);
    myPost(req, res);
});
router.post('/friendsPost', function (req, res) {
    posts(req, res);
});


module.exports = router;