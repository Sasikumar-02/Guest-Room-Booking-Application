import express from 'express';
import Home from '../models/Home.js';
import { createError } from '../utils/error.js';
import { countByCity, countByType, createHome, deleteHome, getHome, getHomes,getHomeRooms, updatedHome } from '../controllers/home.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();
//create
router.post("/", verifyAdmin, createHome)
//update
router.put("/:id", verifyAdmin, updatedHome)

//delete

router.delete("/:id", verifyAdmin, deleteHome)

//get

router.get("/find/:id", getHome)

//get all

router.get("/", getHomes)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHomeRooms);

export default router;