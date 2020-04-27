const { Course } = require('../models/course.model');

exports.saveCourse = async function (doc) {
	return await (new Course(doc)).save();
};

exports.getCourses = async function () {
	return await Course.find()
					   .sort('name');
};

exports.getCoursesPage = async function (pageNumber, pageSize) {
	return await Course.find()
					   .skip((pageNumber - 1) * pageSize)
					   .limit(pageSize)
					   .sort('name')
					   .select('name tags price');
};

exports.getCourseById = async function (id) {
	return await Course.find({ _id: id })
					   .sort('name')
					   .select('name tags price');		   
};

exports.removeCourse = async function (id) {
	return await Course.findByIdAndDelete({ _id: id });
};
