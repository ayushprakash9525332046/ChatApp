require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const initSocket = require("./socket/socket");

const authRoute = require("./routes/authRoute");
const messageRoute = require("./routes/messageRoute");

const app = express();
const server = http.createServer(app); // HTTP server banana zaroori hai Socket ke liye

// Middleware
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"], credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// Socket.io start karo
initSocket(server);

// DB connect and start server
connectDB();
server.listen(process.env.PORT, () => {
  console.log(`Server chal raha hai port ${process.env.PORT} pe!`);
});