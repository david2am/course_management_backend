const {
    getUserByEmail,
    getUserById,
    saveUser
} = require('../services/user.service')

const { validateUser } = require('../models/user.model')

const auth = require('../middleware/auth.middleware')

const express = require('express');
const bcrypt = require('bcrypt')
const Joi = require('joi');
const _ = require('lodash')

const router = express.Router();

router.get('/me', auth, async(req, res) => {
    try {
        const user = await getUserById(req.user._id)
        if (!user) return res.status(404).send(`The user with the given id doesn't exist`)
        res.send(user)
    } catch (ex) {
        console.log(ex.stack)
        res.status(500).send('Something failed.')
    }
});

router.post('/registration', async(req, res) => {
    try {
        const { error, value } = validateUser(req.body)
        if (error) return res.status(400).send(error.message)

        let user = await getUserByEmail(value.email)
        if (user) return res.status(400).send('User already registered.')

        const salt = await bcrypt.genSalt(10)
        value.password = await bcrypt.hash(value.password, salt)

        user = await saveUser(value)

        const token = user.generateAuthToken()
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
    } catch (ex) {
        console.log(ex.stack)
        res.status(500).send('Something failed.')
    }
});

router.post('/login', async(req, res) => {
    try {
        const { error, value } = validate(req.body)
        if (error) return res.status(400).send(error.message)

        let user = await getUserByEmail(value.email)
        if (!user) return res.status(400).send('Invalid email or password.')

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send('Invalid email or password.')

        const token = user.generateAuthToken()
        res.send(token)
    } catch (ex) {
        console.log(ex.stack)
        res.status(500).send('Something failed.')
    }
});

function validate(req) {
    const validString = Joi.string().required().trim().max(255);
    const schema = {
        email: validString.min(5).default(true).lowercase().email(),
        password: validString.min(5)
    };
    return Joi.validate(req, schema);
}

module.exports = router;