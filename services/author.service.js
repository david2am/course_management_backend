const { Author } = require('../models/author.model');

async function saveAuthor (doc) {
	return await (new Author(doc)).save();
};

async function getAuthors () {
	return await Author.find()
					   .sort('name');
};

async function getAuthorsByPage (pageNumber, pageSize) {
	return await Author.find()
					   .skip((pageNumber - 1) * pageSize)
					   .limit(pageSize)
					   .sort('name')
					   .select('name tags price');
};

async function getAuthorById (id) {
	return await Author.find({ _id: id })
					   .sort('name')
					   .select('name tags price');		   
};

async function removeAuthorById (id) {
	return await Author.deleteOne({ _id: id });
};

exports.saveAuthor       = saveAuthor;
exports.getAuthors       = getAuthors;
exports.getAuthorsByPage = getAuthorsByPage;
exports.getAuthorById    = getAuthorById;
exports.removeAuthorById = removeAuthorById;