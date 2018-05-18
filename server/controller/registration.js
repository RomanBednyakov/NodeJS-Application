const sequelize = require('../sequelize/index');
const passwordHash = require('password-hash');
function createUser(req, res) {
    req.body.password = passwordHash.generate(req.body.password);
    sequelize.query(`INSERT INTO users (name, email, password, avatar) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}', '${req.body.avatar}')`, {type: sequelize.QueryTypes.INSERT})
        .then(() => {
                res.json({message: 'ok'});
        })
        .catch((error) => {
            console.log('error',error);
            res.status(401).json({message:error});
        });
}
const registration = function (req, res) {
    sequelize.query("CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, name text, email text, password text, avatar text);")
        .then(() => createUser(req, res))
        .catch((error) => {
            console.log('error',error);
            res.status(401).json({message:error});
        });
};
module.exports = registration;