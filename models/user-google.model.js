const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    provider: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true
    },
    photo: {
        type: String
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
})

const UserGoogle = mongoose.model('userGoogle', userSchema);

module.exports = UserGoogle;