import {EventModel} from '../models/events.model'

class EventController {

    index = async (req, res) => {
        const response = await EventModel.index();
        res.send(response);
    }
    
    show = async (req, res) => {
        const response = await EventModel.show();
        res.send(response);
    }
    
    createParticipant = async (req, res) => {
        const response = await EventModel.show();
        res.send(response);
    }

    finByDay = async (req, res) => {
        const response = await EventModel.show();
        res.send(response);
    }

    findByMonth = async (req, res) => {
        const response = await EventModel.show();
        res.send(response);
    }

    findByYear = async (req, res) => {
        const response = await EventModel.show();
        res.send(response);
    }

    findByParticipant = async (req, res) => {
        const response = await EventModel.show();
        res.send(response);
    }


}



module.exports = new EventController;