const { Course } = require('../models/course.model');
const { Author } = require('../models/author.model');

const { getAuthorById, updateAuthor } = require('./author.service')

async function saveCourse (doc) {
	return await (new Course(doc)).save();
};
 
async function getCourses () {
	return await Course.find()
					   .sort('name')
					   .select('-__v');
};

async function getCoursesByPage (pageNumber, pageSize) {
	return await Course.find()
					   .skip((pageNumber - 1) * pageSize)
					   .limit(pageSize)
					   .sort('name')
					   .select('-__v');
};

async function getCourseById (id) {
	return await Course.find({ _id: id })
					   .sort('name')
					   .select('-__v');		   
};

async function updateCourse (doc, id) {
	return await Course.updateOne({ _id: id }, { 
		$set: {
			name        : doc.name,
			authors     : doc.authors,
			tags        : doc.tags,
			category    : doc.category,
			isPublished : doc.isPublished,
			price       : doc.price
		}
	}, { upsert: false })
};

async function removeCourseById (id) {
	return await Course.deleteOne({ _id: id });
};

// authors
async function addAuthor(courseId, author) {
	const course = await Course.findById(courseId)
	course.authors.push(new Author(author))
	return await course.save()
}

async function updateCourseAuthors(courseId, author) {
	return await Course.updateOne({ '_id'        : courseId,
									'authors._id': author._id }, {
	$set: {
		'authors.$': new Author(author)
	}
  }, { upsert: false })
}

async function removeAuthor(courseId, authorId) {
	const course = await Course.findById(courseId)
	const author = course.authors.id(authorId)
	author.remove()
	return await course.save()
}

exports.saveCourse          = saveCourse
exports.getCourses          = getCourses
exports.getCoursesByPage    = getCoursesByPage
exports.getCourseById       = getCourseById
exports.updateCourse        = updateCourse
exports.removeCourseById    = removeCourseById
exports.addAuthor           = addAuthor
exports.removeAuthor        = removeAuthor
exports.updateCourseAuthors = updateCourseAuthors
