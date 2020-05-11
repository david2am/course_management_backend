const { Course } = require('../models/course.model');

async function saveCourse (doc) {
	return await (new Course(doc)).save();
};

async function getCourses () {
	return await Course.find()
					   .sort('name');
};

async function getCoursesByPage (pageNumber, pageSize) {
	return await Course.find()
					   .skip((pageNumber - 1) * pageSize)
					   .limit(pageSize)
					   .sort('name')
					   .select('name tags price');
};

async function getCourseById (id) {
	return await Course.find({ _id: id })
					   .sort('name')
					   .select('name tags price');		   
};

async function removeCourseById (id) {
	return await Course.deleteOne({ _id: id });
};

exports.saveCourse       = saveCourse
exports.getCourses       = getCourses
exports.getCoursesByPage = getCoursesByPage
exports.getCourseById    = getCourseById
exports.removeCourseById = removeCourseById
