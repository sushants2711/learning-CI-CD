import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    extraInformation: {
        type: String
    },

}, { timestamps: true });

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);