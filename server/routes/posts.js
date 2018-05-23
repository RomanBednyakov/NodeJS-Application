const express = require('express');
const router = express.Router();
const addPost = require('../controller/addPost');
const myPost = require('../controller/myPosts');
const friendsPosts = require('../controller/friendsPosts');
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
    authUser(req, res);
    friendsPosts(req, res);
});


module.exports = router;