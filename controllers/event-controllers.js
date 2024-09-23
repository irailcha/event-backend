import Event from "../models/Event.js";
import Participant from "../models/Participant.js";

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
  
      const event = await Event.findOne({ _id: eventId }).populate("participantList");
      if (!event) {
        throw HttpError(404, `Event not found`);
      }
  
      res.json(event.participantList);
    } catch (error) {
      next(error);
    }
  };
  

  const getRegistration = async (req, res, next) => {
    const { fullname, email, date_of_birth, source } = req.body;
    const { eventId } = req.params;

    try {
        let participant = await Participant.findOne({ email });

        if (!participant) {
            participant = new Participant({
                fullname,
                email,
                date_of_birth,
                source,
            });
            await participant.save();
        }

        const event = await Event.findOne({ _id: eventId });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const participantExists = event.participantList.some(part => part._id.toString() === participant._id.toString());
        if (participantExists) {
            return res.status(409).json({ message: "Participant already registered." });
        }

        event.participantList.push(participant);
        await event.save();

        return res.status(201).json({ message: "Registration successful!", participant });
    } catch (error) {
        next(error);
    }
};




  export default {getAllEvents, getParticipants, getRegistration};