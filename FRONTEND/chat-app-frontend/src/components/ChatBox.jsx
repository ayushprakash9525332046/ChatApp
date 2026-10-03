import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSocket } from "../context/SocketContext";

const ChatBox = ({ selectedUser }) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const myUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Chat history load karo jab bhi selectedUser badle
  useEffect(() => {
    if (!selectedUser) return;
    setMessages([]);

    const fetchMessages = async () => {
      const res = await axios.get(
        `http://localhost:5001/api/messages/${selectedUser._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data);
    };
    fetchMessages();
  }, [selectedUser]);
                                                                                                                        
  // Naye messages socket se sunna
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("userTyping", () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    });
    
    return () => {
      socket.off("newMessage");
      socket.off("userTyping");
    };
  }, [socket]);

  // Naya message aane pe neeche scroll karo
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Time format karna
  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <div className="messages">
        {messages.map((msg) => {
          const isSent = msg.sender === myUser._id || msg.sender?._id === myUser._id;

          return (
            <div key={msg._id} className={`bubble ${isSent ? "sent" : "received"}`}>
              {msg.image && <img src={msg.image} alt="sent" />}
              {msg.message && <span>{msg.message}</span>}
              <div className="time">{formatTime(msg.createdAt)}</div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="bubble received">
            <span>typing...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </>
  );
};

export default ChatBox;


