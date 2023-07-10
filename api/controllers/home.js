import { createError } from '../utils/error.js';
import Home from '../models/Home.js';
import Room from '../models/Room.js';
export const createHome = async(req,res, next)=>{
    const newHome = new Home(req.body);
    try{
        const savedHome = await newHome.save();
        res.status(200).json(savedHome);
    }
    catch(error){
        //res.status(500).json(error);
        next(error);
    }
}

export const updatedHome = async(req,res, next)=>{
    try{
        const updateHome = await Home.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updateHome)
    }
    catch(error){
        //res.status(500).json(error);
        next(error);
    }
}

export const deleteHome = async(req,res, next)=>{
    try{
        await Home.findByIdAndDelete(req.params.id);
        res.status(200).json("Home has been deleted")
    }
    catch(error){
        //res.status(500).json(error);
        next(error);
    }
};

export const getHome = async(req,res, next)=>{
    try{
        const home = await Home.findById(req.params.id)
        res.status(200).json(home)
    }
    catch(error){
        //res.status(500).json(error);
        next(error);
    }
};

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
  
  
export const countByCity = async(req,res, next)=>{
    const cities = req.query.cities.split(",");
    try{
        const list = await Promise.all(
            cities.map(city=>{
                return Home.countDocuments({city:city});
            })
        );
        res.status(200).json(list)
    }
    catch(error){
        next(error);
    }
}

export const countByType = async(req,res, next)=>{
    try{
        const homeCount = await Home.countDocuments({type:"Hotel"});
        const apartmentCount = await Home.countDocuments({type:"apartment"});
        const resortCount = await Home.countDocuments({type: "resort"});
        const villaCount = await Home.countDocuments({type:"villa"});
        const cabinCount = await Home.countDocuments({type:"cabin"});
        res.status(200).json([
            {type: "Hotel", count: homeCount},
            {type: "apartments", count: apartmentCount},
            {type: "resorts", count: resortCount},
            {type: "villas", count: villaCount},
            {type: "cabins", count: cabinCount},

        ]);
    }
    catch(error){
        next(error);
    }
}

// export const countByType = async (req, res, next) => {
//     try {
//       const types = ["home", "apartment", "resort", "villa", "cabin"];
//       const countPromises = types.map(async (type) => {
//         const count = await Home.countDocuments({ type });
//         return { type, count };
//       });
//       const countByType = await Promise.all(countPromises);
//       res.status(200).json(countByType);
//     } catch (error) {
//       next(error);
//     }
//   };

export const getHomeRooms = async (req, res, next) => {
    try {
      const home = await Home.findById(req.params.id);
      const list = await Promise.all(
        home.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (error) {
      next(error);
    }
};