import {Router} from 'express'
import {index, show, createParticipant} from '../controllers/participants.controller.js'


const router = Router()

router.get('/participants', index )
router.get('/participants/:id', show )
router.post('/participants', createParticipant )

export default router