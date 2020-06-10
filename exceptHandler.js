const winston = require('winston');
require('winston-mongodb');
const config = require('config');

function exceptHandler() {
    // find jwtPrivateKey
    if (!process.env.course_jwtPrivateKey) {
        console.error('FATAL ERROR: jwt private key is not defined');
        process.exit(1);
    }

    // handling uncaughtException
    process.on('uncaughtException', ex => {
        winston.error(ex.message, { metadata: ex });
        process.exit(1);
    });

    // handling unhandledRejection
    process.on('unhandledRejection', ex => {
        winston.error(ex.message, { metadata: ex });
        process.exit(1);
    });

    // store route errors
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(
        new winston.transports.MongoDB({
            db: config.get('db.url'),
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        })
    );
}

module.exports = exceptHandler;