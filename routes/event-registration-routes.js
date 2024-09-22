import express from "express";
import eventRegistration from '../controllers/event-registration.js'

const eventRouterRegister=express.Router()


eventRouterRegister.post('/:eventId/register', eventRegistration);

export default eventRouterRegister;