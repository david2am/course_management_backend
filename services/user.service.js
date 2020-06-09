const { User } = require('../models/user.model');

async function saveUser (doc) {
	return await (new User(doc)).save();
};

async function getUsers () {
	return await User.find()
					 .sort('name')
					 .select('-__v -password');
};

async function getUsersByPage (pageNumber, pageSize) {
	return await User.find()
					 .skip((pageNumber - 1) * pageSize)
					 .limit(pageSize)
					 .sort('name')
					 .select('-__v -password');
};

async function getUserByEmail (email) {
	return await User.findOne({ email: email })
					 .select('-__v');		   
};

async function getUserById (id) {
	return await User.find({ _id: id })
					   .sort('name')
					   .select('-__v -password');		   
};

async function updateUser (doc) {
	return await User.updateOne({ _id: doc.id }, { 
		$set: { 
			name     : doc.name,
			email    : doc.email,
			password : doc.password
		}
	}, { upsert: false })
};

async function removeUserById (id) {
	return await User.deleteOne({ _id: id });
};

exports.saveUser       = saveUser;
exports.getUsers       = getUsers;
exports.getUsersByPage = getUsersByPage;
exports.getUserByEmail = getUserByEmail;
exports.getUserById    = getUserById;
exports.updateUser     = updateUser;
exports.removeUserById = removeUserById;