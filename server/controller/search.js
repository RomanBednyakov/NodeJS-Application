const sequelize = require('../sequelize/index');

function searchFriend (req, res, users) {
    sequelize.query(`SELECT following FROM followers WHERE follower ='${req.body.userId}'`, {type: sequelize.QueryTypes.SELECT})
        .then((friends) => res.json({users, friends}))
        .catch((error) => res.status(401).json({message:error}))
}

const search = function (req, res) {
    if (req.body.text !== '') {
        sequelize.query(`SELECT name, id FROM users WHERE name LIKE '%${req.body.text}%' AND id != '${req.body.userId}'`, {type: sequelize.QueryTypes.SELECT})
            .then((users) => searchFriend(req, res, users))
            .catch((error) => res.status(401).json({message:error}))
    } else {
        res.json({message:"empty"});
    }
};

module.exports = search;