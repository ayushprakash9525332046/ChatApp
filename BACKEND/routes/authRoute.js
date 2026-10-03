const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "Register ho gaya!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User nahi mila!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password galat hai!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login ho gaya!", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Profile Picture Upload
router.post("/avatar", protect, upload.single("avatar"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.file.path },
      { new: true }
    );
    res.status(200).json({ message: "Avatar update ho gaya!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sare Users lao (chat ke liye contacts)
router.get("/users", protect, async (req, res) => {
  try {
    // Apne aap ko chod ke baaki sab users
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;