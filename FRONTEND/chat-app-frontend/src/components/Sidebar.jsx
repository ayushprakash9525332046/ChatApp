import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSocket } from "../context/SocketContext";

const Sidebar = ({ selectedUser, onSelectUser }) => {
  const navigate = useNavigate();
  const { onlineUsers } = useSocket();
  const [users, setUsers] = useState([]);
  const myUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5001/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <h3>💬 {myUser?.username}</h3>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* User List */}
      <div className="user-list">
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isActive = selectedUser?._id === user._id;

          return (
            <div
              key={user._id}
              className={`user-item ${isActive ? "active" : ""}`}
              onClick={() => onSelectUser(user)}
            >
              {/* Avatar */}
              <div className="avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} />
                ) : (
                  <div className="avatar-placeholder">
                    {user.username[0].toUpperCase()}
                  </div>
                )}
                {isOnline && <span className="online-dot" />}
              </div>

              {/* Name + Status */}
              <div className="user-info">
                <span>{user.username}</span>
                {isOnline && <small>online</small>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
