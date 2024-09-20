import express from "express";
import eventRegistration from '../controllers/event-registration.js'

const eventRouterRegister=express.Router()

eventRouterRegister.post('/', eventRegistration);

export default eventRouterRegister;