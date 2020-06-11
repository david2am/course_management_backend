const express = require('express');

const error = require('../middleware/error.middleware')

const home = require('../routes/home.api');
const authors = require('../routes/author.route');
const courses = require('../routes/course.api');
const users = require('../routes/users.api');


function routes(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/authors', authors);
    app.use('/api/courses', courses);
    app.use('/api/users', users);

    app.use(error)
}

module.exports = routes