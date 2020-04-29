const mongoose = require('mongoose');
const Joi = require('joi');

const Course = mongoose.model(
	'Course',
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 255,
			trim: true
		},
		category: {
			type: String,
			required: true,
			trim: true,
			enum: [ 'web', 'mobile', 'network' ],
			lowercase: true,
		},
		author: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 255,
			trim: true
		},
		tags: {
			type: Array,
			validate: {
				validator: function (v) {
					return v && v.length > 0;
				},
				message: 'A course should have at least one tag'
			}
		},
		date: { type: Date, default: Date.now },
		isPublished: Boolean,
		price: {
			type: Number,
			required: function() {
				return this.isPublished;
			},
			min: 0,
			max: 200,
			get: v => Math.round(v),
			set: v => Math.round(v)
		}
	})
);

function validate (course) {
	const validString = Joi.string().required().trim();
	const validPrice = Joi.number().min(0).max(200);

	const schema = {
		name:        validString.min(3).max(255),
		category:    validString.default(true).lowercase().valid('web', 'mobile', 'network'),
		author:      validString.min(3).max(255),
		tags:        Joi.array().items(validString.default(true).lowercase()),
		date:        Joi.date(),
		isPublished: Joi.boolean(),
		price:       course.isPublished ? 
					 validPrice.required() :
					 validPrice
	};

	return Joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validate;