const {
    saveAuthor,
    getAuthors,
    getAuthorById,
    getAuthorsByPage,
    updateAuthor,
    removeAuthorById
} = require('../services/author.service')
const { validateAuthor } = require('../models/author.model')


async function get(req, res) {
    pageNumber = parseInt(req.query.pageNumber)
    pageSize = parseInt(req.query.pageSize)

    const authors = pageNumber && pageSize ?
        await getAuthorsByPage(pageNumber, pageSize) :
        await getAuthors();

    res.send(authors);
}

async function post(req, res) {
    const { error, value } = validateAuthor(req.body)
    if (error) return res.status(400).send(error.message)

    const author = await saveAuthor(value)

    res.send(author)
};

async function getById(req, res) {
    const author = await getAuthorById(req.params.id)
    if (!author) return res.status(404).send(`The author with the given id doesn't exist`)

    res.send(author)
};

async function putById(req, res) {
    const { error, value } = validateAuthor(req.body)
    if (error) return res.status(400).send(error.message)

    const author = await updateAuthor(value, req.params.id)
    if (!author) return res.status(404).send(`The author with the given id doesn't exist`)

    res.send(author)
};

async function deleteById(req, res) {
    const author = await removeAuthorById(req.params.id)
    if (!author) return res.status(404).send(`The author with the given id doesn't exist`)

    res.send(author)
};

exports.get = get;
exports.post = post;
exports.getById = getById;
exports.putById = putById;
exports.deleteById = deleteById;