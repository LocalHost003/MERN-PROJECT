const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Alert model
const Alert = mongoose.model("Alert", new mongoose.Schema({
  name: String,
  location: String,
  type: String,
  contact: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
}));

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});


// API Routes
app.get('/api/alerts', async (req, res) => {
  const alerts = await Alert.find().sort({ timestamp: -1 });
  res.json(alerts);
});

app.post('/api/alerts', async (req, res) => {
  const newAlert = new Alert(req.body);
  await newAlert.save();
  res.json(newAlert);
  io.emit("receive_alert", newAlert);
});

// Socket.io
io.on("connection", (socket) => {
  console.log("🟢 New client connected");

  socket.on("sendAlert", (data) => {
    console.log("📥 Received alert from client:", data);
    io.emit("receive_alert", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
