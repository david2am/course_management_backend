const Joi      = require('joi');
const express  = require('express');
const mongoose = require('mongoose');
const config   = require('config');
const courses  = require('./api/course.api');
const authors  = require('./api/author.api');
const users    = require('./api/user.api');
const home     = require('./api/home.api');

Joi.objectId   = require('joi-objectid')(Joi);

const DATABASE_URL = config.get('db.url');

const mongooseSetting = {	useNewUrlParser: true,
							useUnifiedTopology: true,
							useCreateIndex: true
						}
mongoose.connect(DATABASE_URL, mongooseSetting)
		.then(() => console.log('Connected to MongoDB...'))
		.catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();
app.use(express.json());

app.use('/', home);
app.use('/api/courses', courses);
app.use('/api/authors', authors);
app.use('/api/users',   users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
