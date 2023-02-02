import {Router} from 'express'

import EventController from "../controllers/events.controller.js";
import EventModel from '../models/events.model.js'
import ParticipantModel from "../models/participants.model.js";
import ParticipantController from "../controllers/participants.controller.js";

const eventModel = new EventModel();
const participantModel = new ParticipantModel();

const eventController = new EventController(eventModel);
const participantController = new ParticipantController(participantModel);

const router = Router()

router.get('/filter/events', eventController.filter)
router.get('/filter/participants/:id', participantController.filter)

export default router