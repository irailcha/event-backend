import express from "express";
import eventControllers from '../controllers/event-controllers.js';
import eventRegistration from '../controllers/event-registration.js'


const eventRouter = express.Router();


eventRouter.get('/', eventControllers.getAllEvents);

eventRouter.get('/:eventId/participants', eventControllers.getParticipants);

eventRouter.post('/:eventId/register', eventRegistration);


export default eventRouter;

