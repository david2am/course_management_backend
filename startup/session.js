const env = require('config');
const passport = require('passport');
const cookieSession = require('cookie-session')

function session(app) {
    app.use(cookieSession({
        maxAge: 60 * 60 * 1000,
        keys: [env.get('session.cookieKey')]
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}

module.exports = session