import { useState } from "react";
import axios from "axios";
import { useSocket } from "../context/SocketContext";

const MessageInput = ({ selectedUser, onMessageSent }) => {
  const { socket } = useSocket();
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  // Text message bhejo
  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await axios.post(
      `http://localhost:5001/api/messages/send/${selectedUser._id}`,
      { message: text },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Socket se real-time deliver karo
    socket.emit("sendMessage", {
      receiverId: selectedUser._id,
      message: res.data,
    });

    onMessageSent(res.data); // ChatBox update karo
    setText("");
  };

  // Image bhejo
  const sendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `http://localhost:5001/api/messages/send-image/${selectedUser._id}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    socket.emit("sendMessage", {
      receiverId: selectedUser._id,
      message: res.data,
    });

    onMessageSent(res.data);
    e.target.value = ""; // Input reset
  };

  // Typing indicator emit karo
  const handleTyping = () => {
    socket.emit("typing", { receiverId: selectedUser._id });
  };

  // Enter se bhi send ho
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="msg-input">
      {/* Image upload */}
      <label htmlFor="img-upload">📎</label>
      <input
        id="img-upload"
        type="file"
        accept="image/*"
        onChange={sendImage}
      />

      {/* Text input */}
      <input
        type="text"
        placeholder="Message likho..."
        value={text}
        onChange={(e) => { setText(e.target.value); handleTyping(); }}
        onKeyDown={handleKeyDown}
      />

      {/* Send button */}
      <button className="send-btn" onClick={sendMessage}>➤</button>
    </div>
  );
};

export default MessageInput;
