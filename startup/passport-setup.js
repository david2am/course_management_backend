const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const env = require('config');
const UserGoogle = require('../models/user-google.model');

const googleOps = {
    callbackURL: '/auth/google/redirect',
    clientID: env.get('google.clientID'),
    clientSecret: env.get('google.clientSecret')
}

const loginPassport = async(accessToken, refreshToken, profile, done) => {

    const user = await UserGoogle.findOne({ userId: profile.id })
    if (user) {
        done(null, user)
        return
    }

    const doc = {
        username: profile.displayName,
        userId: profile.id,
        provider: profile.provider
    }

    const newUser = await (new UserGoogle(doc)).save()
    done(null, newUser)

}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    const user = await UserGoogle.findOne({ userId: id })
    done(null, user)
})

const googletrategy = new GoogleStrategy(googleOps, loginPassport);

passport.use(googletrategy)