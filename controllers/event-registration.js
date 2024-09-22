import EventRegistr from "../models/EventRegistr.js";
import Event from "../models/Event.js";

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

    const event = await Event.findById(eventId);
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

export default eventRegistration;
