# 💬 Real-Time Chat Application

A full-stack, real-time chat application built using **Node.js**, **Express**, **MongoDB**, **Socket.io**, **React 19**, and **Vite**.

![Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express%20%7C%20MongoDB%20%7C%20React%20%7C%20Socket.io-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- 🔐 **Authentication & Authorization**: Secure JWT-based registration and login with `bcryptjs` password hashing.
- ⚡ **Real-Time Messaging**: WebSockets powered by `Socket.io` for instant message delivery without page reloads.
- 🟢 **Live Online Status**: Real-time tracking of active/online users in the chat sidebar.
- ⌨️ **Typing Indicators**: Visual indication when the recipient is typing a message.
- 🖼️ **Image & Media Sharing**: Upload and send images directly inside chat bubbles via Cloudinary.
- 🎨 **Clean & Responsive UI**: Modern sidebar and chat container design using vanilla CSS.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 + Vite
- **Routing**: React Router DOM (v7)
- **WebSockets**: `socket.io-client`
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Real-Time Engine**: `socket.io`
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **File Uploads**: `multer` + `cloudinary` + `multer-storage-cloudinary`

---

## 📁 Directory Structure

```text
ChatApp/
├── BACKEND/
│   ├── config/          # Database connection & Cloudinary setup
│   ├── middleware/      # JWT authentication middleware
│   ├── models/          # User & Message Mongoose schemas
│   ├── routes/          # Auth & Message Express routes
│   ├── socket/          # Socket.io connection & event handlers
│   ├── app.js           # Express server entrypoint
│   ├── .env.example     # Environment variable template
│   └── package.json
│
├── FRONTEND/
│   └── chat-app-frontend/
│       ├── public/      # Static assets & icons
│       ├── src/
│       │   ├── components/ # ChatBox, Sidebar, MessageInput
│       │   ├── context/    # SocketContext provider
│       │   ├── pages/      # Home, Login, Register
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── vite.config.js
│       └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Database](https://www.mongodb.com/cloud/atlas) (Atlas cluster or local instance)
- [Cloudinary Account](https://cloudinary.com/) (For image message uploads)

---

### 1. Environment Setup

Create a `.env` file inside the `BACKEND` directory based on the `.env.example`:

```env
PORT = 5001
MONGO_URI = mongodb+srv://<username>:<password>@cluster.mongodb.net/chatapp
JWT_SECRET = your_jwt_secret_key
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
```

---

### 2. Backend Setup & Running

```bash
# Navigate to BACKEND directory
cd BACKEND

# Install backend dependencies
npm install

# Start the development server (runs on port 5001)
npm run dev
```

---

### 3. Frontend Setup & Running

```bash
# Navigate to FRONTEND directory
cd FRONTEND/chat-app-frontend

# Install frontend dependencies
npm install

# Start the Vite development server (runs on http://localhost:5173)
npm run dev
```

---

## 🔌 API Endpoints

### Auth Routes (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login user & return JWT token |
| `GET` | `/api/auth/users` | Get list of registered users (Protected) |

### Message Routes (`/api/messages`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/messages/:userId` | Get chat history with specific user |
| `POST` | `/api/messages/send/:userId` | Send text message to specific user |
| `POST` | `/api/messages/send-image/:userId` | Send image file to specific user |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
