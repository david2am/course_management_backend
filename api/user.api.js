const express = require('express');
const router = express.Router();
const { saveUser,
        getUserByEmail } = require('../services/user.service')
const { validateUser } = require('../models/user.model')

const bcrypt = require('bcrypt')
const _ = require('lodash')

router.post('/', async (req, res) => {
	const { error, value } = validateUser(req.body)
	if (error) return res.status(400).send(error.message)

	let user = await getUserByEmail (value.email)
	if (user) return res.status(400).send('User already registered.')

	const salt = await bcrypt.genSalt(10)
	value.password = await bcrypt.hash(value.password, salt)
	
	user = await saveUser (value)

	const token = user.generateAuthToken()
	res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
});

module.exports = router;