const sequelize = require('../sequelize/index');
const myPost = function (req, res) {
    sequelize.query(`SELECT * FROM posts WHERE userId = '${req.body.userId}'`, {type: sequelize.QueryTypes.SELECT})
        .then((posts) => {
            posts.forEach((item) => {
                delete item.id;
                delete item.userid;
            });
            res.json({posts});
        })
        .catch((error) => res.status(401).json({message: error}));
};
module.exports = myPost;