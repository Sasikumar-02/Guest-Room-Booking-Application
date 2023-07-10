import express from 'express';
import Room from '../models/Room.js';
import Home from '../models/Home.js';
import { createError } from '../utils/error.js';
import { createRoom, deleteRoom, getRoom, getRooms, updatedRoom, updateRoomAvailability } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create a room for a home
router.post("/:id", verifyAdmin, createRoom);

// Update a room
router.put("/:id", verifyAdmin, updatedRoom);

// Update room availability
router.put("/availability/:id", updateRoomAvailability);

// Delete a room
router.delete("/:id/:homeId", verifyAdmin, deleteRoom);

// Get a room
router.get("/:id", getRoom);

// Get all rooms
router.get("/", getRooms);

export default router;
