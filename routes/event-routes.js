import express from "express";
import eventControllers from '../controllers/event-controllers.js';

const eventRouter = express.Router();


eventRouter.get('/', eventControllers.getAllEvents);

eventRouter.post('/:eventId/participants/:participantId', eventControllers.addParticipants);

eventRouter.get('/:eventId/participants', eventControllers.getParticipants);

export default eventRouter;
