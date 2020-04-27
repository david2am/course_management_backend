const express = require('express');
const courses = require('./api/course.api');
const home = require('./api/home.api');
const mongoose = require('mongoose');
const config = require('config');

const DATABASE_URL = config.get('db.url');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log('Connected to MongoDB...'))
		.catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();
app.use(express.json());

app.use('/', home);
app.use('/api/courses', courses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
