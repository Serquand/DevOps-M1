const express = require("express");
const router = express.Router();

const ToDoController = require("../controllers/todo.controller");

router.get("/", ToDoController.getTasks);
router.post("/", ToDoController.createTask);
router.patch("/complete/:id", ToDoController.updateTask);
router.delete("/:id", ToDoController.deleteTasks);

module.exports = router;