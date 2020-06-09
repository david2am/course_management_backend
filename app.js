const express = require('express');
const logger = require('./api/logger.api');
const courses = require('./api/course.api');
const authors = require('./api/author.api');
const register = require('./api/registration.api');
const home = require('./api/home.api');
const dbConnect = require('./dbConnect');

if (!process.env.course_jwtPrivateKey) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

dbConnect()

const app = express();

app.use(express.json());
app.use('/', home);
app.use('/api/courses', courses);
app.use('/api/authors', authors);
app.use('/api/users', register);
app.use('/api/log', logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));