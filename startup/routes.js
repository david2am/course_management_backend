const express = require('express');

const error = require('../middleware/error.middleware')

const home = require('../api/home.api');
const authors = require('../api/author.api');
const courses = require('../api/course.api');
const users = require('../api/users.api');


function routes(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/authors', authors);
    app.use('/api/courses', courses);
    app.use('/api/users', users);

    app.use(error)
}

module.exports = routes