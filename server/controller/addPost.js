const sequelize = require('../sequelize/index');
function insert(req, res) {
    sequelize.query(`INSERT INTO posts (content, data, title, userId) VALUES ('${req.body.content}', '${req.body.data}', '${req.body.title}', '${req.body.userId}')`, {type: sequelize.QueryTypes.INSERT})
    .then(() => res.json({message: 'Post added'}))
    .catch((error) => res.status(401).json({message: error}));
}
const addPost = function (req, res) {
    sequelize.query("CREATE TABLE IF NOT EXISTS posts (id serial PRIMARY KEY, content text, data text, title text, userId text);")
        .then(() => insert(req, res))
        .catch((error) => res.status(401).json({message: error}));
};
module.exports = addPost;