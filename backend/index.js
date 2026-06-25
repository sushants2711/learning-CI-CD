import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/db.connect.js";
import todoRouter from "./routers/todo.router.js";
import morgan from "morgan";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));


const origins = ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()) : [];

app.use(cors({
    origin: origins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));



app.get("/health", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        database: dbStatus,
        timestamp: new Date().toISOString()
    });
});


// server working
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is working",
        timestamp: new Date().toISOString()
    });
});


app.use("/api/todo", todoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});