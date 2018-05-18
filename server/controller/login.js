const sequelize = require('../sequelize/index');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../passportJs/index').jwtOptions;
const passwordHash = require('password-hash');

const login = function (req, res) {
    sequelize.query(`SELECT * FROM users WHERE name = '${req.body.name}'`, {type: sequelize.QueryTypes.SELECT})
        .then((users) => {
            if (passwordHash.verify(req.body.password, users[0].password)) {
                console.log('##',);
                let user = users[0];
                let payload = {user: user.id};
                let token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '100m' });
                res.json({message: "ok", token: token});
            } else {
                res.status(401).json({message:"passwords did not match"});
            }
        })
        .catch((error) => {
            console.log('error',error);
            res.status(401).json({message:"passwords did not match"});
        })
};
module.exports = login;