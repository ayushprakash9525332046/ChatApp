import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5001/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Register nahi hua!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Make Account👋</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />

        {error && <p className="error-msg">{error}</p>}

        <button onClick={handleRegister}>Register</button>

        <p>
           Already an have account? <Link to="/login">Login </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
