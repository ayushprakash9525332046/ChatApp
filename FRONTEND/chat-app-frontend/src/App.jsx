import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Agar token nahi hai toh login pe bhejo
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
};

export default App;
