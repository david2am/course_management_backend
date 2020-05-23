const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const { authorSchema } = require('./author.model')

const courseSchema = new mongoose.Schema({
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
	authors: {
		type: [new mongoose.Schema({
			_id: {
				type: mongoose.Types.ObjectId
			},
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
				lowercase: true
			},
			website: {
				type: String,
				required: false,
				minlength: 3,
				maxlength: 255,
				trim: true
			}
		})],
		required: true,
		validate: {
			validator: function (v) {
				return v && v.length > 0;
			},
			message: 'A course should have at least one author'
		}
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

const Course = mongoose.model('Course', courseSchema);

function validate (course) {
	const validString = Joi.string().required().trim();
	const validPrice = Joi.number().min(0).max(200);
	const schema = {
		id:          Joi.objectId(),
		name:        validString.min(3).max(255),
		category:    validString.default(true).lowercase().valid('web', 'mobile', 'network'),
		authors:     Joi.array().items(Joi.object()),
		tags:        Joi.array().items(validString.default(true).lowercase()),
		date:        Joi.date(),
		isPublished: Joi.boolean(),
		price:       course.isPublished ? 
					 validPrice.required() :
					 validPrice
	};
	return Joi.validate(course, schema);
}

exports.Course         = Course;
exports.courseSchema   = courseSchema;
exports.validateCourse = validate;