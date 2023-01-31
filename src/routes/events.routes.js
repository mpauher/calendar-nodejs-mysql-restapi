import {Router} from 'express'
import EventController from '../controllers/events.controller.js'
import EventModel from '../models/events.model.js'

const event = new EventModel();
const eventController = new EventController(event);

const router = Router()

router.get('/events', eventController.index() )
router.get('/events/:id', eventController.show )
router.post('/events', eventController.create)

export default router
