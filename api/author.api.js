const express = require('express');
const router = express.Router();
const { saveAuthor,
        getAuthors,
        getAuthorById,
		getAuthorsByPage,
		updateAuthor,
        removeAuthorById } = require('../services/author.service')
const { validateAuthor } = require('../models/author.model');
const auth = require('../middleware/auth.middleware')

router.get('/', async (req, res) => {
	pageNumber = parseInt(req.query.pageNumber)
	pageSize   = parseInt(req.query.pageSize)
	const authors = pageNumber && pageSize ? 
					await getAuthorsByPage(pageNumber, pageSize) :
					await getAuthors();

	res.send(authors);
});

router.post('/', auth, async (req, res) => {
	const { error, value } = validateAuthor(req.body)
	if (error) return res.status(400).send(error.message)

	const author = await saveAuthor (value)
	res.send(author)
});

router.get('/:id', async (req, res) => {		
	const author = await getAuthorById(req.params.id)
	if (!author) return res.status(404).send(`The author with the given id doesn't exist`)
	res.send(author)
});

router.put('/:id', auth, async (req, res) => {
	const { error, value } = validateAuthor(req.body)
	if (error) return res.status(400).send(error.message)

	const author = await updateAuthor(value, req.params.id)
	if (!author) return res.status(404).send(`The author with the given id doesn't exist`)

	res.send(author)
});

router.delete('/:id', auth, async (req, res) => {
	const author = await removeAuthorById(req.params.id)
	if (!author) return res.status(404).send(`The author with the given id doesn't exist`)
	res.send(author)
});

module.exports = router;