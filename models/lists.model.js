const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
});

const List = mongoose.model('List', listSchema);

module.exports = List