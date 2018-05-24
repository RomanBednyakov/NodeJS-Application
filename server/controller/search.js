const sequelize = require('../sequelize/index');

function searchFriend (req, res, users) {
    sequelize.query(`SELECT following FROM followers WHERE follower ='${req.body.userId}'`, {type: sequelize.QueryTypes.SELECT})
        .then((friends) => {
            friends.forEach((item) => {
                users.forEach((users) => {
                    if (String(item.following) ===String(users.id)) {
                        users.following = item.following;
                    }
                });
            });
            res.json({users});
        })
        .catch(() => res.json({users}))
}

const search = function (req, res) {
    if (req.headers.text !== '') {
        sequelize.query(`SELECT name, id FROM users WHERE name LIKE '%${req.headers.text}%' AND id != '${req.body.userId}'`, {type: sequelize.QueryTypes.SELECT})
            .then((users) => {
                if (users.length > 0) {
                    searchFriend(req, res, users)
                } else {
                    res.json({message:"empty"});
                }
            })
            .catch((error) => res.status(401).json({message:error}))
    } else {
        res.json({message:"empty"});
    }
};

module.exports = search;