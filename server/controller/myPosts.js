const sequelize = require('../sequelize/index');
function selectPost(req, res) {
    sequelize.query(`SELECT users.name, posts.content, posts.date, posts,title FROM users RIGHT JOIN posts ON users.id='${req.body.userId}' WHERE posts.user_id='${req.body.userId}'`,{type: sequelize.QueryTypes.SELECT})
        .then((posts) => {
            posts.forEach((item) => {
                delete item.posts;
            });
            res.json({posts});
        })
        .catch((error) => res.status(401).json({message: error}));
}
const myPost = function (req, res) {
    sequelize.query("CREATE TABLE IF NOT EXISTS posts (id serial PRIMARY KEY, content text, date text, title text, user_id text);")
        .then(() => selectPost(req, res))
        .catch((error) => res.status(401).json({message: error}));
};
module.exports = myPost;