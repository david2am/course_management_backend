
const express = require('express');
const courses = require('./routes/course.router');
const home = require('./routes/home.router');

const app = express();
app.use(express.json());

app.use('/', home);
app.use('/api/courses', courses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
