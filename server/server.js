// server/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http"; // needed to create HTTP server

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ Mongo error:", err));

// Routes (you can add later)
app.get("/", (req, res) => {
  res.send("API is running");
});

// Create HTTP server
const httpServer = http.createServer(app);

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // frontend dev URL
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("⚡ Client connected:", socket.id);

  socket.on("sendAlert", (data) => {
    console.log("🚨 Alert received:", data);
    io.emit("receiveAlert", data); // broadcast to others
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
