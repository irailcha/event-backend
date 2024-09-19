import Event from "../models/Event.js";


const getAllEvents= async (req, res, next) => {
    try {
  
      const result = await Event.find({}, "-createdAt -updatedAt");
  
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Events not found." });
      }
      res.json(result)
    } catch (error) {
      next(error);
    }
  };
  


  export default getAllEvents;