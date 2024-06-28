const Todo = require("../schema/todo.model.js");

const getTodos = async (req, res) => {
    const todos = await Todo.find({ is_complete: false });
    const done = await Todo.find({ is_complete: true });

    res.status(200).send({todos, done});
}

const createTodo = async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        is_complete: false,
        due_date: req.body.due_date || new Date(),
    });

    await todo.save();
    res.status(201).json(todo);
}

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id });

        if (req.body.is_complete != undefined && req.body.is_complete != null ) {
            todo.is_complete = req.body.is_complete;
        }

        await todo.save();
        res.status(200).json(todo);
    } catch {
        res.status(404).json({ error: "Todo does not exist!" });
    }
}

const deleteTodo = async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id });

        res.status(204).json();
    } catch {
        res.status(404).json({ error: "Todo does not exist!" });
    }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };