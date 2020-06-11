function home(req, res) {
    res.render('index', { title: 'My Express App', message: 'Hello World!!' });
};

exports.home = home;