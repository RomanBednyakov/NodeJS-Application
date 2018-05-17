const sequelize = require('../sequelize/index');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const config = require('../config/index');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.secretOrKey;
const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    sequelize.query(`SELECT * FROM users WHERE id = '${jwt_payload.user}'`, {type: sequelize.QueryTypes.SELECT})
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
    jwtOptions: jwtOptions
};

module.exports = passportJs;
