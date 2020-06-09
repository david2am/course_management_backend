const express = require('express');
const router = express.Router();
const {
    saveAuthor,
    getAuthors,
    getAuthorById,
    getAuthorsByPage,
    updateAuthor,
    removeAuthorById
} = require('../services/author.service')
const { validateAuthor } = require('../models/author.model');
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')

router.get('/', async(req, res) => {
    try {
        pageNumber = parseInt(req.query.pageNumber)
        pageSize = parseInt(req.query.pageSize)
        const authors = pageNumber && pageSize ?
            await getAuthorsByPage(pageNumber, pageSize) :
            await getAuthors();

        res.send(authors);
    } catch (ex) {
        console.log(ex.stack)
        res.status(500).send('Something failed')
    }
});

router.post('/', auth, async(req, res) => {
    try {
        const { error, value } = validateAuthor(req.body)
        if (error) return res.status(400).send(error.message)

        const author = await saveAuthor(value)
        res.send(author)
    } catch (ex) {
        console.log(ex.stack)
        res.status(500).send('Something failed')
    }
});

router.get('/:id', async(req, res) => {
    try {
        const author = await getAuthorById(req.params.id)
        if (!author) return res.status(404).send(`The author with the given id doesn't exist`)
        res.send(author)
    } catch (ex) {
        console.log(ex.stack)
        res.status(500).send('Something failed')
    }
});

router.put('/:id', auth, async(req, res) => {
    try {
        const { error, value } = validateAuthor(req.body)
        if (error) return res.status(400).send(error.message)

        const author = await updateAuthor(value, req.params.id)
        if (!author) return res.status(404).send(`The author with the given id doesn't exist`)

        res.send(author)
    } catch (ex) {
        console.log(ex.stack)
        res.status(500).send('Something failed')
    }
});

router.delete('/:id', [auth, admin], async(req, res) => {
    try {
        const author = await removeAuthorById(req.params.id)
        if (!author) return res.status(404).send(`The author with the given id doesn't exist`)
        res.send(author)
    } catch (ex) {
        console.log(ex.stack)
        res.status(500).send('Something failed')
    }
});

module.exports = router;