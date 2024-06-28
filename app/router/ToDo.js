const router = require("express").Router()
const { getTodos, createTodo, deleteTodo, updateTodo } = require("../controlers/todo.controler");

router.get("/", getTodos)
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router