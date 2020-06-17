const {
    saveCourse,
    getCourses,
    getCoursesByPage,
    getCourseById,
    updateCourse,
    removeCourseById,
    updateAuthor
} = require('../services/course.service');
const {
    getAuthorById,
    saveAuthor,
    addAuthor
} = require('../services/author.service');
const { validateCourse } = require('../models/course.model');
const { validateAuthor } = require('../models/author.model');
const { deleteById } = require('./author.controller');


async function get(req, res) {
    pageNumber = parseInt(req.query.pageNumber);
    pageSize = parseInt(req.query.pageSize);

    const courses = pageNumber && pageSize ?
        await getCoursesByPage(pageNumber, pageSize) :
        await getCourses();

    res.send(courses);
}

async function post(req, res) {
    const { error, value } = validateCourse(req.body);
    if (error) return res.status(400).send(error.message);

    let validAuthor = true;
    let authors = [];
    for (const a of value.authors) {
        const author = await getAuthorById(a.id);
        if (author.length === 0) {
            validAuthor = false;
            break;
        }
        authors.push(author[0]);
    }
    if (!validAuthor) return res.status(400).send('Invalid author');
    value.authors = authors

    const course = await saveCourse(value);

    res.send(course);
}

async function getById(req, res) {
    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).send(`The course with the given id doesn't exist`);

    res.send(course);
}

async function putById(req, res) {
    const { error, value } = validateCourse(req.body);
    if (error) return res.status(400).send(error.message);

    let authors = []
    for (let author of value.authors) {
        const { error, value } = validateAuthor(author);
        if (error) return res.status(400).send(error.message);
        authors.push(value)
    }
    value.authors = authors

    const course = await updateCourse(value, req.params.id);
    if (!course) return res.status(404).send(`The course with the given id doesn't exist`);

    res.send(course);
}

async function removeById(req, res) {
    const course = await removeCourseById(req.params.id);
    if (!course) return res.status(404).send(`The course with the given id doesn't exist`);

    res.send(course);
}

async function postByIdByAuthorId(req, res) {
    const { error, value } = validateAuthor(req.body);
    if (error) return res.status(400).send(error.message);

    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).send(`The course with the given id doesn't exist`);

    const author = await getAuthorById(req.params.authorId);
    if (!author) await saveAuthor(value);

    const author_ = {...value, id: req.params.authorId };
    const course_ = await addAuthor(req.params.id, author_);

    res.send(course_);
}

async function putByIdByAuthorId(req, res) {
    const { error, value } = validateAuthor(req.body);
    if (error) return res.status(400).send(error.message);

    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).send(`The course with the given id doesn't exist`);

    const author = await getAuthorById(req.params.authorId);
    if (!author) return res.status(404).send(`The author with the given id doesn't exist`);

    const author_ = {...value, id: author._id };
    const courseUpdated = await updateAuthor(req.params.id, author_);
    await saveAuthor(author_);

    res.send(courseUpdated);
}

exports.get = get;
exports.post = post;
exports.getById = getById;
exports.putById = putById;
exports.removeById = removeById;
exports.postByIdByAuthorId = postByIdByAuthorId;
exports.putByIdByAuthorId = putByIdByAuthorId;