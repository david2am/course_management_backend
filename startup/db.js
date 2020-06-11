const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston')

function db() {
    const DATABASE_URL = config.get('db.url');

    const settings = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };
    mongoose.connect(DATABASE_URL, settings)
        .then(() => winston.info('Connected to MondoDB...'))
}

module.exports = db