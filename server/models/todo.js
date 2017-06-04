var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true// 'trim' deletes any white spaces at the beginning and the end of the string
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number
    }
});

module.exports = {
    Todo
};