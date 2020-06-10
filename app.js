const express = require('express');
require('express-async-errors')
const winston = require('winston')

const error = require('./middleware/error.middleware')
const home = require('./api/home.api');
const authors = require('./api/author.api');
const courses = require('./api/course.api');
const users = require('./api/users.api');

const dbConnect = require('./dbConnect');

winston.add(new winston.transports.File({ filename: 'logfile.log' }))

if (!process.env.course_jwtPrivateKey) {
    console.error('FATAL ERROR: jwt private key is not defined');
    process.exit(1);
}

dbConnect()

const app = express();

app.use(express.json());
app.use('/', home);
app.use('/api/authors', authors);
app.use('/api/courses', courses);
app.use('/api/users', users);

app.use(error)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));