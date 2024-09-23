import express from "express";
import eventControllers from '../controllers/event-controllers.js';




const eventRouter = express.Router();


eventRouter.get('/', eventControllers.getAllEvents);

eventRouter.get('/:eventId/participants', eventControllers.getParticipants);

eventRouter.post('/:eventId/register', eventControllers.getRegistration);


export default eventRouter;

