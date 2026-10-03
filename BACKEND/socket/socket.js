const { Server } = require("socket.io");

// Online users store karne ke liye
const onlineUsers = {};

const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173" }, // React ka URL
  });

  io.on("connection", (socket) => {
    console.log("User connect hua:", socket.id);

    // User online hua
    socket.on("userOnline", (userId) => {
      onlineUsers[userId] = socket.id;
      io.emit("onlineUsers", Object.keys(onlineUsers)); // Sabko batao
    });

    // Message bheja
    socket.on("sendMessage", ({ receiverId, message }) => {
      const receiverSocketId = onlineUsers[receiverId];

      if (receiverSocketId) {
        // Receiver online hai — seedha bhejo
        io.to(receiverSocketId).emit("newMessage", message);
      }
      // Agar offline hai toh DB mein already save hai
    });

    // Typing indicator
    socket.on("typing", ({ receiverId }) => {
      const receiverSocketId = onlineUsers[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userTyping");
      }
    });

    // User disconnect hua
    socket.on("disconnect", () => {
      // Online users se hatao
      for (let userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
          break;
        }
      }
      io.emit("onlineUsers", Object.keys(onlineUsers));
    });
  });
};


module.exports = initSocket;