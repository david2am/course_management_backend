const winston = require('winston');
const config = require('config');
require('express-async-errors');
require('winston-mongodb');


function logging() {
    // handling uncaughtException
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    )

    // handling unhandledRejection
    process.on('unhandledRejection', ex => {
        throw ex
    });

    // handling request errors
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(
        new winston.transports.MongoDB({
            db: config.get('db.url'),
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        })
    );
}

module.exports = logging;