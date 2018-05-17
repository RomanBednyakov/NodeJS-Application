const home = function (req, res) {
    let user = req.user;
    delete user.password;
    res.json({message: "ok", user});
};

module.exports = home;