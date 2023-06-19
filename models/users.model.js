const mongoose = require('mongoose');
const Lists = require('./lists.model');

const userSchema = new mongoose.Schema({
    nama: {
        type: String,
        require: true,
    },
    login_number: {
        type: Number,
        require: true,
    },
    token: {
        type: String,
        require: true,
        default: undefined
    },
})

userSchema.virtual('lists', {
    ref: 'Lists',
    localField: '_id',
    foreignField: 'user'
})

const User = mongoose.model('User', userSchema);

module.exports = User 