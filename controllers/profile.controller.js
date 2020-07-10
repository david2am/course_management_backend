const profile = (req, res) => {
    res.send('Welcome ' + req.user.username);
}

module.exports = profile;