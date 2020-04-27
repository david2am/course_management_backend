
const express = require('express');
const courses = require('./api/course.api');
const home = require('./api/home.api');

const app = express();
app.use(express.json());

app.use('/', home);
app.use('/api/courses', courses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
