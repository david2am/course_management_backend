const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome ' + req.user.username);
});

module.exports = router;