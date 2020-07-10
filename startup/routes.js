const express = require('express');

const error = require('../middleware/error.middleware')

const homeRoutes = require('../routes/home.routes');
const authorRoutes = require('../routes/author.routes');
const courseRoutes = require('../routes/course.routes');
const userRoutes = require('../routes/users.routes');
const authRoutes = require('../routes/auth.routes');
const profileRoutes = require('../routes/profile.routes')


function routes(app) {
    app.use(express.json());
    app.use('/', homeRoutes);
    app.use('/authors', authorRoutes);
    app.use('/courses', courseRoutes);
    app.use('/users', userRoutes);
    app.use('/auth', authRoutes)
    app.use('/profile', profileRoutes)

    app.use(error)
}

module.exports = routes