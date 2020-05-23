const express = require('express');
const router = express.Router();
const { saveUser,
        getUsers,
        getUserById,
		getUsersByPage,
		updateUser,
        removeUserById } = require('../services/user.service')
const { validateUser } = require('../models/user.model');

router.get('/', async (req, res) => {
	pageNumber = parseInt(req.query.pageNumber)
	pageSize   = parseInt(req.query.pageSize)
	const authors = pageNumber && pageSize ? 
					await getUsersByPage(pageNumber, pageSize) :
					await getUsers();

	res.send(authors);
});

router.post('/', async (req, res) => {
	const { error, value } = validateUser(req.body)
	if (error) return res.status(400).send(error.message)

	const user = await saveUser (value)
	res.send(user)
});

router.get('/:id', async (req, res) => {		
	const user = await getUserById(req.params.id)
	if (!user) return res.status(404).send(`The user with the given id doesn't exist`)
	res.send(user)
});

router.put('/:id', async (req, res) => {
	const { error, value } = validateUser(req.body)
	if (error) return res.status(400).send(error.message)

	const user = await updateUser(value, req.params.id)
	if (!user) return res.status(404).send(`The user with the given id doesn't exist`)

	res.send(user)
});

router.delete('/:id', async (req, res) => {
	const user = await removeUserById(req.params.id)
	if (!user) return res.status(404).send(`The user with the given id doesn't exist`)
	res.send(user)
});

module.exports = router;