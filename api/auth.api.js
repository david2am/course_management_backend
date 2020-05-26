const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { saveUser,
        getUsers,
        getUserByEmail,
		getUsersByPage, 
		updateUser,
        removeUserById } = require('../services/user.service')
const { validateUser } = require('../models/user.model')

const bcrypt = require('bcrypt')
const _ = require('lodash')

router.post('/', async (req, res) => {
	const { error, value } = validate(req.body)
	if (error) return res.status(400).send(error.message)

	let user = await getUserByEmail (value.email)
	if (!user) return res.status(400).send('Invalid email or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password.')
	
	const token = user.generateAuthToken()
	res.send(token)
});

function validate(req) {
	const validString = Joi.string().required().trim().max(255);
	const schema = {
		email    : validString.min(5).default(true).lowercase().email(),
		password : validString.min(5)
	};
	return Joi.validate(req, schema);
}

module.exports = router;