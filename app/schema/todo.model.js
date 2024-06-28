const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    is_complete: Boolean,
    due_date: Date,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
