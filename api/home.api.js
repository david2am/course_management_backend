const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middleware/async.middleware')

router.get('/', asyncMiddleware((req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello World!!' });
}));

module.exports = router;