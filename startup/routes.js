const express = require('express');

const error = require('../middleware/error.middleware')

const homeRoutes = require('../routes/home.routes');
const authorRoutes = require('../routes/author.routes');
const courseRoutes = require('../routes/course.routes');
const userRoutes = require('../routes/users.routes');
const authRoutes = require('../routes/auth.routes');


function routes(app) {
    app.use(express.json());
    app.use('/', homeRoutes);
    app.use('/api/authors', authorRoutes);
    app.use('/api/courses', courseRoutes);
    app.use('/api/users', userRoutes);
    app.use('/auth', authRoutes)

    app.use(error)
}

module.exports = routes