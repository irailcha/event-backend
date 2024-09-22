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
  

  const eventRegistration = async (req, res, next) => {
    const { fullname, email, date_of_birth, source } = req.body;
    const { eventId } = req.params; 
  
    const newRegistration = new EventRegistr({
      fullname,
      email,
      date_of_birth,
      source,
    });
  
    try {
  
      await newRegistration.save();
  
      const event = await Event.findOne({ _id: eventId });
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      event.participantList.push(newRegistration);
      await event.save();
  
      return res.status(201).json({ message: "Registration successful!", participant: newRegistration });
    } catch (error) {
      next(error);
    }
  };

  export default {getAllEvents, getParticipants, eventRegistration};