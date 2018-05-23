const sequelize = require('../sequelize/index');

function selectFriendsPost(req, res) {
    sequelize.query(`SELECT users.name, posts.content, posts.date, posts.title FROM users RIGHT JOIN posts ON users.id::varchar = posts.userid WHERE posts.userid IN (SELECT following FROM followers WHERE follower::varchar=${req.body.userId}::varchar)`, {type: sequelize.QueryTypes.SELECT})
        .then((posts) => {
            res.json({posts});
        })
        .catch((error) =>{
            console.error('error',error);
            res.status(401).json({message: error})
        });
}
const friendsPosts = function (req, res) {
    sequelize.query("CREATE TABLE IF NOT EXISTS posts (id serial PRIMARY KEY, content text, data text, title text, userId text);")
        .then(() => selectFriendsPost(req, res))
        .catch((error) => res.status(401).json({message: error}));
};

module.exports = friendsPosts;