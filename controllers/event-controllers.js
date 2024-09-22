import Event from "../models/Event.js";
import EventRegistr from "../models/EventRegistr.js";

const getAllEvents= async (req, res, next) => {
    try {
  
      const result = await Event.find({});
  
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Events not found." });
      }
      res.json(result)
    } catch (error) {
      next(error);
    }
  };
  

  

  const getParticipants = async (req, res, next) => {
    try {
      const { eventId } = req.params; 
  
      const event = await Event.findById(eventId).populate("participantList");
      if (!event) {
        throw HttpError(404, `Event not found`);
      }
  
      res.json(event.participantList);
    } catch (error) {
      next(error);
    }
  };
  

  export default {getAllEvents, addParticipants, getParticipants};