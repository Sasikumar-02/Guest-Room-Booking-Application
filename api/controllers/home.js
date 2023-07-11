import { createError } from '../utils/error.js';
import Home from '../models/Home.js';
import Room from '../models/Room.js';

// Create a new home
export const createHome = async (req, res, next) => {
  const newHome = new Home(req.body);
  try {
    const savedHome = await newHome.save();
    res.status(200).json(savedHome);
  } catch (error) {
    // If an error occurs, pass it to the next middleware
    next(error);
  }
}

// Update a home
export const updatedHome = async (req, res, next) => {
  try {
    const updatedHome = await Home.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHome);
  } catch (error) {
    next(error);
  }
}

// Delete a home
export const deleteHome = async (req, res, next) => {
  try {
    await Home.findByIdAndDelete(req.params.id);
    res.status(200).json("Home has been deleted");
  } catch (error) {
    next(error);
  }
};

// Get a specific home
export const getHome = async (req, res, next) => {
  try {
    const home = await Home.findById(req.params.id);
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
};

// Get a list of homes based on filters
export const getHomes = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const homes = await Home.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(homes);
  } catch (error) {
    next(error);
  }
};

// Count the number of homes in each city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map(city => {
        return Home.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

// Count the number of homes by type
export const countByType = async (req, res, next) => {
  try {
    const homeCount = await Home.countDocuments({ type: "Hotel" });
    const apartmentCount = await Home.countDocuments({ type: "apartment" });
    const resortCount = await Home.countDocuments({ type: "resort" });
    const villaCount = await Home.countDocuments({ type: "villa" });
    const cabinCount = await Home.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Hotel", count: homeCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

// Get rooms for a specific home
export const getHomeRooms = async (req, res, next) => {
  try {
    const home = await Home.findById(req.params.id);
    const list = await Promise.all(
      home.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};