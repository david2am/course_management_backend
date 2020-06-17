const express = require('express');

const error = require('../middleware/error.middleware')

const home = require('../routes/home.routes');
const authors = require('../routes/author.routes');
const courses = require('../routes/course.routes');
const users = require('../routes/users.routes');


function routes(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/authors', authors);
    app.use('/api/courses', courses);
    app.use('/api/users', users);

    app.use(error)
}

module.exports = routes