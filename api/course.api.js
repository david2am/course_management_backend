const express = require('express');
const router = express.Router();
const { saveCourse,
		getCourses,
		getCoursesByPage,
		getCourseById,
		removeCourseById } = require('../services/course.service');
const { validate } = require('../models/course.model');

router.get('/', async (req, res) => {
	pageNumber = parseInt(req.query.pageNumber)
	pageSize = parseInt(req.query.pageSize)
	const courses = pageNumber && pageSize ? 
					await getCoursesByPage(pageNumber, pageSize) :
					await getCourses();

	res.send(courses);
});

router.post('/', async (req, res) => {
	const { error, value } = validate(req.body)
	if (error) return res.status(400).send(error.message)

	const course = await saveCourse(value)
	res.send(course)
});

router.get('/:id', async (req, res) => {
	const course = await getCourseById(req.params.id)
	if (!course) return res.status(404).send(`The course with the given id doesn't exist`)

	res.send(course)
});

router.put('/:id', async (req, res) => {
	const { error, value } = validate(req.body)
	if (error) return res.status(400).send(error.message)

	const course = await saveCourse({...value, id: req.params.id})
	if (!course) return res.status(404).send(`The course with the given id doesn't exist`)

	res.send(course)
});

router.delete('/:id', async (req, res) => {
	const course = await removeCourseById(req.params.id)
	if (!course) return res.status(404).send(`The course with the given id doesn't exist`)
	res.send(course)
});

module.exports = router;
