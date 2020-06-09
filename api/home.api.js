const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.render('index', { title: 'My Express App', message: 'Hello World!!' });
    } catch (ex) {
        console.log(ex.stack)
        res.status(500).send('Something failed.')
    }
});

module.exports = router;