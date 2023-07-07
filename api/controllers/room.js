import Room from '../models/Room.js';
import Home from '../models/Home.js';
import { createError } from '../utils/error.js';

export const createRoom =async(req, res, next)=>{
    const homeId = req.params.homeId;
    const newRoom = new Room(req.body)
    try{
        const savedRoom = await newRoom.save();
        try{
            await Home.findByIdAndUpdate(homeId, {
                $push: { rooms: savedRoom._id}
            });
        }
        catch(error){
            next(error);
        }
        res.status(200).json(savedRoom);
    } catch(error){
        next(error)
    }
};

export const updatedRoom = async(req,res, next)=>{
    try{
        const updateRoom = await Home.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updateRoom);
    }
    catch(error){
        //res.status(500).json(error);
        next(error);
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
};

export const deleteRoom = async(req,res, next)=>{
    const homeId = req.params.homeId;
    try{
        await Room.findByIdAndDelete(req.params.id);
        try{
            await Home.findByIdAndUpdate(homeId, {
                $pull: { rooms: req.params.id}
            });
        }
        catch(error){
            next(error);
        }
        res.status(200).json("Room has been deleted")
    }
    catch(error){
        //res.status(500).json(error);
        next(error);
    }
};

export const getRoom = async(req,res, next)=>{
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    }
    catch(error){
        //res.status(500).json(error);
        next(error);
    }
}

export const getRooms = async(req,res, next)=>{
    try{
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }
    catch(error){
        next(error);
    }
}