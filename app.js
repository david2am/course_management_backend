const winston = require('winston');
const app = require('express')();
const passportSetup = require('./startup/passport-setup');

app.set('view engine', 'ejs')

require('./startup/logging')()
require('./startup/session')(app)
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/validation')()

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));