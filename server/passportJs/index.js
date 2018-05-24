const sequelize = require('../sequelize/index');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const config = require('../config/index');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const authUser = function (req) {
    if(req.method === 'GET') {
        let user = jwt.verify(req.headers.authorization, config.secretOrKey);
        req.body.userId = user.user;
    }else {
        let user = jwt.verify(req.body.token, config.secretOrKey);
        req.body.userId = user.user;
    }
};

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.secretOrKey;
const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    sequelize.query(`SELECT id, name, email, avatar FROM users WHERE id = '${jwt_payload.user}'`, {type: sequelize.QueryTypes.SELECT})
        .then((users) => {
            let user = users[0];
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        });
});

passport.use(strategy);

const passportJs = {
    passportJs : passport,
    jwtOptions,
    authUser
};

module.exports = passportJs;
