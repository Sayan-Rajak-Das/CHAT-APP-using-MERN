import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import connectDB from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

// Increase the payload size limit
app.use(express.json({ limit: "10mb" })); // Set the limit to 10MB or more as per your needs
app.use(express.urlencoded({ limit: "10mb", extended: true })); // For form data


app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () =>{
    console.log("Server is running on the port", PORT);
    connectDB();
});