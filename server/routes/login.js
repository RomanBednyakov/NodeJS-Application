let sequelize = require('../sequelize/index');
let jwt = require('jsonwebtoken');
let jwtOptions = require('../passportJs/index').jwtOptions;
let login = function (req, res) {
    sequelize.query(`SELECT * FROM users WHERE name = '${req.body.name}' AND password = '${req.body.password}'`, {type: sequelize.QueryTypes.SELECT})
        .then((users) => {
            let user = users[0];
            if(user.password === req.body.password) {
                let payload = {user: user.id};
                let token = jwt.sign(payload, jwtOptions.secretOrKey,
                    { expiresIn: '1m' });
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