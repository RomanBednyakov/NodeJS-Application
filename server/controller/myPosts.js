const sequelize = require('../sequelize/index');
function selectPost(req, res) {
    sequelize.query(`SELECT users.name, posts.content, posts.data, posts,title FROM posts INNER JOIN users ON users.id='${req.body.userId}'`,{type: sequelize.QueryTypes.SELECT})
        .then((posts) => {
            posts.forEach((item) => {
                delete item.posts;
            });
            res.json({posts});
        })
        .catch((error) => res.status(401).json({message: error}));
}
const myPost = function (req, res) {
    sequelize.query("CREATE TABLE IF NOT EXISTS posts (id serial PRIMARY KEY, content text, data text, title text, userId text);")
        .then(() => selectPost(req, res))
        .catch((error) => res.status(401).json({message: error}));
};
module.exports = myPost;