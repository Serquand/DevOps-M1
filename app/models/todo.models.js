import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  is_complete: Boolean,
  due_date: Date,
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo; // Use default export
