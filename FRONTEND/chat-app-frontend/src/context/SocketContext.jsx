import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_BASE_URL } from "../config";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const newSocket = io(API_BASE_URL);
    setSocket(newSocket);

    // Apna userId server ko do
    newSocket.emit("userOnline", user._id);

    // Online users list update hoti rahe
    newSocket.on("onlineUsers", (users) => setOnlineUsers(users));

    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
