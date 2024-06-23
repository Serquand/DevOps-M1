const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Todo = new Schema({
    title: String,
    description: String,
    is_complete: Boolean,
    due_date: Date,
});

module.exports = mongoose.model('Todo', Todo);