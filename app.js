let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let passport = require('./server/passportJs/index').passportJs;
// let jwt = require('jsonwebtoken');
// let config = require('./server/config/index');
// function authUser(req, res, next) {
//     console.log('##',112222);
//     console.log('##',req.body);
//     if (req.body.token !== null && req.body.token !== undefined) {
//         let user = jwt.verify(req.body.token, config.secretOrKey);
//         req.body.user = user;
//     }
//     next();
// }
app.use('/login', express.static('view/login'));
app.use('/registration', express.static('view/registration'));
app.use('/', express.static('view/home'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
// app.use(authUser);

module.exports = app;