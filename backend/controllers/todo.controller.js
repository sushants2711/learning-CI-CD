import { Todo } from "../models/todo.model.js";


export const createTodo = async (req, res) => {
    try {
        const { title, description, extraInformation, isActive } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Please provide title and description" });
        };

        const newTodo = new Todo({
            title,
            description,
            extraInformation,
            isActive
        });

        const savedTodo = await newTodo.save();

        if (!savedTodo) {
            return res.status(400).json({ success: false, message: "Failed to create todo" });
        };

        return res.status(201).json({ success: true, message: "Todo created successfully", todo: savedTodo });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};



export const getAllTodo = async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({ success: true, message: "Todos fetched successfully", todos });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch todos", error: error.message });
    };
};