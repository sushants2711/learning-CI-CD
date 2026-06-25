import express from "express";
import { createTodo, getAllTodo } from "../controllers/todo.controller.js";

const todoRouter = express.Router();

todoRouter.post("/create", createTodo);
todoRouter.get("/getAll", getAllTodo);

export default todoRouter;