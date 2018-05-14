// let sequelize = require('../sequelize/index');
let login = function (req, res) {
    let user = req.user;
    user.password = null;
    res.json({message: "ok", user: user});
    // sequelize.query(`SELECT * FROM users WHERE id = '${req.body.user.user}'`, {type: sequelize.QueryTypes.SELECT})
    //     .then((users) => {
    //         let user = users[0];
    //         user.password = null;
    //         if(user.id === req.body.user.user) {
    //             res.json({message: "ok", user: user});
    //         } else {
    //             res.status(401).json({message:"not found user"});
    //         }
    //     })
    //     .catch((error) => {
    //         console.log('error',error);
    //         res.status(401).json({message:"not found user"});
    //     })
};

module.exports = login;