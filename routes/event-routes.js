import express from "express";
import getAllEvents from '../controllers/event-controllers.js';



const eventRouter=express.Router();

eventRouter.get('/', getAllEvents);

export default eventRouter;