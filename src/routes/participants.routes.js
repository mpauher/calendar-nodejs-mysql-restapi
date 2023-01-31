import {Router} from 'express'
import ParticipantController from '../controllers/participants.controller.js'
import ParticipantModel from '../models/participants.model.js'

const participantModel = new ParticipantModel();
const participantController = new ParticipantController(participantModel);

const router = Router()

router.get('/participants', participantController.index() )
router.get('/participants/:id', participantController.show )
router.post('/participants', participantController.create )
router.post('/participants/join', participantController.join )


export default router