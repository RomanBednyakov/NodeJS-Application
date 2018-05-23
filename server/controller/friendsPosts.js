const sequelize = require('../sequelize/index');
function searchFriend (req, res, posts) {
    console.log('##',req.body);
    sequelize.query(`SELECT name FROM users WHERE id IN (SELECT following FROM followers WHERE follower='${req.body.userId}')`, {type: sequelize.QueryTypes.SELECT})
        .then((friends) => {
            console.log('##',friends);
            // friends.forEach((item) => {
            //     posts.forEach((post) => {
            //         if (String(item.following) ===String(post.userid)) {
            //             post.name = item.following;
            //         }
            //     });
            // });
            // console.log('##',posts);
            // res.json({posts});
        })
        .catch((error) => {
            res.json({posts});
            // console.log('##',error);
        })
}

function selectFriendsPost(req, res) {
    // console.log('##',typeof req.body.userId);
    // sequelize.query(`SELECT userId, content, data, title FROM posts WHERE userid IN (SELECT following FROM followers WHERE follower='${req.body.userId}')`,{type: sequelize.QueryTypes.SELECT})
    // sequelize.query(`SELECT users.name, posts.content, posts.data, posts.title FROM users JOIN followers ON followers.follower='${req.body.userId}' JOIN posts ON posts.userid = followers.following`,{type: sequelize.QueryTypes.SELECT})
    sequelize.query(`SELECT users.name, posts.content, posts.data, posts.title FROM users RIGHT JOIN posts ON users.id::varchar = posts.userid WHERE posts.userid IN (SELECT following FROM followers WHERE follower::varchar=${req.body.userId}::varchar)`, {type: sequelize.QueryTypes.SELECT})
        .then((posts) => {
            console.log('posts',posts);
            // console.log('##',posts);
            res.json({posts});
            // searchFriend(req, res ,posts);
        })
        .catch((error) =>{
            console.error('error',error);
            res.status(401).json({message: error})
        });
}
// const friendsPosts = function (req, res) {
//     sequelize.query("CREATE TABLE IF NOT EXISTS posts (id serial PRIMARY KEY, content text, data text, title text, userId text);")
//         .then(() => selectFriendsPost(req, res))
//         .catch((error) => res.status(401).json({message: error}));
// };
module.exports = selectFriendsPost;