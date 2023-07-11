import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import homesRoute from "./routes/homes.js";
import userRoute from "./routes/users.js";
import roomRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();
const app = express();

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw(error);
  }
}

// Handle MongoDB disconnection
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/homes", homesRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/users", userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Start the server
app.listen(8100, () => {
  connect();
  console.log("Connected to the backend");
});
