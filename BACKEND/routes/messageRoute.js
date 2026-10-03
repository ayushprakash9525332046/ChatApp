const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

// Message bhejo
router.post("/send/:receiverId", protect, async (req, res) => {
  try {
    const { message } = req.body;
    const { receiverId } = req.params;

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      message,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Image bhejo
router.post("/send-image/:receiverId", protect, upload.single("image"), async (req, res) => {
  try {
    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: req.params.receiverId,
      image: req.file.path,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Purani chat history lao
router.get("/:userId", protect, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id },
      ],
    }).sort({ createdAt: 1 }); // Purane pehle

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//message seen krna
router.put("/seen/:messageId", protect, async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    req.params.messageId,
    { seen: true },
    { new: true }
  );

  res.json(message);
});

module.exports = router;