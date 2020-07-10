const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true
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
    }
})

const UserGoogle = mongoose.model('userGoogle', userSchema);

module.exports = UserGoogle;