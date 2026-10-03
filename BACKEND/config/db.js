const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connect ho gaya!");
//   } catch (error) {
//     console.log("MongoDB error:", error);
//   }
// };

const connectDB = async () => {
  try {
    console.log("MONGO_URI =", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connect ho gaya!");
  } catch (error) {
    console.log("MongoDB error:", error);
  }
};

module.exports = connectDB;