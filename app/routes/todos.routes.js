import express from "express";
const router = express.Router();

import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todo.controller.js"; // Add the .js extension

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
