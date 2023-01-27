import {ParticipantModel} from '../models/participants.model'

class ParticipantController {

    index = async (req, res) => {
        const response = await ParticipantModel.index();
        res.send(response);
    }
    
    show = async (req, res) => {
        const response = await ParticipantModel.show();
        res.send(response);
    }
    
    createParticipant = async (req, res) => {
        const response = await ParticipantModel.show();
        res.send(response);
    }
}

module.exports = new ParticipantController;