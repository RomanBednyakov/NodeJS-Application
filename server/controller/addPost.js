const sequelize = require('../sequelize/index');
function insert(req, res) {
    sequelize.query(`INSERT INTO posts (content, date, title, user_id) VALUES ('${req.body.content}', '${req.body.date}', '${req.body.title}', '${req.body.userId}')`, {type: sequelize.QueryTypes.INSERT})
    .then(() => res.json({message: 'Post added'}))
    .catch((error) => res.status(401).json({message: error}));
}
const addPost = function (req, res) {
    sequelize.query("CREATE TABLE IF NOT EXISTS posts (id serial PRIMARY KEY, content text, date text, title text, user_id text);")
        .then(() => insert(req, res))
        .catch((error) => res.status(401).json({message: error}));
};
module.exports = addPost;