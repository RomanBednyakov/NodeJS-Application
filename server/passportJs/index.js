let sequelize = require('../sequelize/index');
let passport = require('passport');
let passportJWT = require("passport-jwt");
let config = require('../config/index');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.secretOrKey;
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
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

let passportJs = {
    passportJs : passport,
    jwtOptions: jwtOptions
};

module.exports = passportJs;
