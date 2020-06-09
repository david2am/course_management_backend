const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const jwt = require('jsonwebtoken');

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
	},
	isAdmin: {
		type: Boolean
	}
});

userSchema.methods.generateAuthToken = function() {
	const payload = { _id: this._id, isAdmin: this.isAdmin };
	return jwt.sign(payload, process.env.course_jwtPrivateKey, { expiresIn: 1440 });
};

const User = mongoose.model('User', userSchema);

function validate(user) {
	const validString = Joi.string().required().trim().max(255);
	const schema = {
		name: validString.min(3),
		email: validString.min(5).default(true).lowercase().email(),
		password: validString.min(5)
	};
	return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validate;
