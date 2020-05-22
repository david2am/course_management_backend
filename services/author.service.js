const { Author } = require('../models/author.model');

async function saveAuthor (doc) {
	return await (new Author(doc)).save();
};

async function getAuthors () {
	return await Author.find()
					   .sort('name')
					   .select('-__v');
};

async function getAuthorsByPage (pageNumber, pageSize) {
	return await Author.find()
					   .skip((pageNumber - 1) * pageSize)
					   .limit(pageSize)
					   .sort('name')
					   .select('-__v');
};

async function getAuthorById (id) {
	return await Author.find({ _id: id })
					   .sort('name')
					   .select('-__v');		   
};

async function updateAuthor (doc, id) {
	/* const author = await Author.findById(id)
	if (!author) return

	author.name    = doc.name
	author.bio     = doc.bio
	author.website = doc.website

	return await author.save() */

	return await Author.updateOne({ _id: id }, { 
		$set: { 
			name    : doc.name,
			bio     : doc.bio,
			website : doc.website
		}
	}, { upsert: false })
};

async function removeAuthorById (id) {
	return await Author.deleteOne({ _id: id });
};

exports.saveAuthor       = saveAuthor;
exports.getAuthors       = getAuthors;
exports.getAuthorsByPage = getAuthorsByPage;
exports.getAuthorById    = getAuthorById;
exports.updateAuthor     = updateAuthor;
exports.removeAuthorById = removeAuthorById;