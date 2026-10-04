import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login nahi hua!");
    }
  };

  // Enter press pe bhi login ho
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Come Back 👋</h2>

        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        {error && <p className="error-msg">{error}</p>}

        <button onClick={handleLogin}>Login</button>

        <p>
          If not have an account? <Link to="/register">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
