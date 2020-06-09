const config = require('config');
const mongoose = require('mongoose');

module.exports = function dbConnect() {
    const DATABASE_URL = config.get('db.url');

    const mongooseSetting = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };
    mongoose
        .connect(DATABASE_URL, mongooseSetting)
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...', err));
}