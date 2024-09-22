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
  





  const addParticipants = async (req, res, next) => {
    try {
      const { eventId, participantId } = req.params;  // Отримуємо ідентифікатори з параметрів
  
      const event = await Event.findById(eventId);  // Використовуємо findById для події
      if (!event) {
        throw HttpError(404, `Event not found`);
      }
  
      const participant = await EventRegistr.findById(participantId);  // Шукаємо учасника за ідентифікатором
      if (!participant) {
        throw HttpError(404, `Participant with ${participantId} not found`);
      }
  
      const isAlreadyAdded = event.participantList.some(
        (p) => p._id.toString() === participantId
      );
  
      if (isAlreadyAdded) {
        throw HttpError(400, `Participant with ${participantId} is already added`);
      }
  
      event.participantList.push(participant);  // Додаємо учасника до списку події
  
      await event.save();  // Зберігаємо зміни
  
      res.json({ message: "Participant added successfully" });
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