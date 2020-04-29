const mongoose = require('mongoose');
const Joi = require('joi');

const Author = mongoose.model(
	'Author',
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 3,
            maxlength: 255,
            trim: true
		},
		bio: {
			type: String,
			required: true,
			minlength: 3,
            maxlength: 255,
            trim: true,
            lowercase: true,
		},
		website: {
			type: String,
			required: false,
			minlength: 3,
            maxlength: 255,
            trim: true
		},
	})
);

function validate (author) {
	const validString = Joi.string().required().trim().min(3).max(255);

	const schema = {
		name:    validString,
        bio:     validString.default(true).lowercase(),
        website: validString
	};

	return Joi.validate(author, schema);
}

exports.Author = Author;
exports.validate = validate;