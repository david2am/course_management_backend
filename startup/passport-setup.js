const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const env = require('config');
const UserGoogle = require('../models/user-google.model');


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    const user = await UserGoogle.findOne({ _id: id })
    done(null, user)
})

const googletrategy = new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: env.get('google.clientID'),
        clientSecret: env.get('google.clientSecret')
    },
    async(accessToken, refreshToken, profile, done) => {

        const user = await UserGoogle.findOne({ userId: profile.id })
        if (user) {
            done(null, user)
            return
        }

        const doc = {
            username: profile.displayName,
            userId: profile.id,
            provider: profile.provider,
            photo: profile._json.picture
        }

        const newUser = await (new UserGoogle(doc)).save()
        done(null, newUser)

    });

passport.use(googletrategy)