import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import { useSocket } from "../context/SocketContext";

const Home = () => {
  const { onlineUsers } = useSocket();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  // Naya message aane pe messages mein add karo
  const handleNewMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  // User change hone pe messages reset karo
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  return (
    <div className="home">
      {/* Left — Contacts */}
      <Sidebar
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
      />

      {/* Right — Chat */}
      <div className="chat-area">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="chat-header">
              <div className="avatar">
                {selectedUser.avatar ? (
                  <img src={selectedUser.avatar} alt={selectedUser.username} />
                ) : (
                  <div className="avatar-placeholder">
                    {selectedUser.username[0].toUpperCase()}
                  </div>
                )}
                {isOnline && <span className="online-dot" />}
              </div>
              <div className="user-info">
                <span>{selectedUser.username}</span>
                <small>{isOnline ? "online" : "offline"}</small>
              </div>
            </div>

            {/* Messages */}
            <ChatBox
              selectedUser={selectedUser}
              extraMessages={messages}
            />

            {/* Input */}
            <MessageInput
              selectedUser={selectedUser}
              onMessageSent={handleNewMessage}
            />
          </>
        ) : (
          <div className="no-chat">
            <span>💬</span>
            <p>Chat to Some One!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

