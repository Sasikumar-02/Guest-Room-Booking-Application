import express from 'express';
import Room from '../models/Room.js';
import { createError } from '../utils/error.js';
import { createRoom, deleteRoom, getRoom, getRooms, updatedRoom , updateRoomAvailability} from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();
//create
router.post("/:homeid", verifyAdmin, createRoom)
//update
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updatedRoom);

//delete

router.delete("/:id/:homeid", verifyAdmin, deleteRoom)

//get

router.get("/:id", getRoom)

//get all

router.get("/", getRooms)

export default router;