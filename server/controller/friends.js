const sequelize = require('../sequelize/index');

function createFriend(req, res) {
    sequelize.query(`INSERT INTO followers (follower, following) VALUES ('${req.body.userId}', '${req.body.followingId}')`, {type: sequelize.QueryTypes.INSERT})
        .then(() => res.json({message: 'ok'}))
        .catch((error) => res.status(401).json({message:error}));
}

function deleteFriend(req, res) {
    sequelize.query(`DELETE FROM followers WHERE follower='${req.body.userId}' AND following='${req.body.followingId}'`, {type: sequelize.QueryTypes.DELETE})
        .then(() => res.json({message: 'ok'}))
        .catch((error) => res.status(401).json({message:error}));
}

function checkFriend(req, res) {
sequelize.query(`SELECT * FROM followers WHERE follower='${req.body.userId}' AND following='${req.body.followingId}'`, {type: sequelize.QueryTypes.SELECT})
    .then((friend) => {
        if (friend.length <= 0) {
            createFriend(req, res)
        } else {
            deleteFriend(req, res)
        }})
    .catch((error) => res.status(401).json({message:error}));
}

const friends = function (req, res) {
    sequelize.query("CREATE TABLE IF NOT EXISTS followers (id serial PRIMARY KEY, follower text, following text);")
        .then(() => checkFriend(req, res))
        .catch((error) => res.status(401).json({message:error}));
};

module.exports = friends;