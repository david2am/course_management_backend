const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255,
		trim: true
	},
	email: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255,
		trim: true,
        lowercase: true,
        unique: true
	},
	password: {
		type: String,
		required: false,
		minlength: 8,
		maxlength: 255,
		trim: true
	}
});

const User = mongoose.model('User', userSchema);

function validate(user) {
	const validString = Joi.string().required().trim().max(255);
	const schema = {
		name     : validString.min(3),
		email    : validString.min(5).default(true).lowercase().email(),
		password : validString.min(5)
	};
	return Joi.validate(user, schema);
}

exports.User         = User;
exports.validateUser = validate;
