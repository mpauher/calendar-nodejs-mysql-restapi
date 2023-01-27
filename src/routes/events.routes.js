import {Router} from 'express'

import {index, show, createEvent, findByDay, findByMonth, findByYear, findByParticipant } from '../controllers/events.controller.js'

const router = Router()

router.get('/events', index )
router.get('/events/:id', show )
router.post('/events', createEvent )
router.get('/events/findByDay', findByDay )
router.get('/events/findByMonth', findByMonth )
router.get('/events/findByYear', findByYear )
router.get('/events/findByParticipant ', findByParticipant )

export default router
