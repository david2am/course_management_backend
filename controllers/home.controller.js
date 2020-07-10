function home(req, res) {
    res.render('home', { user: req.user });
};

exports.home = home;