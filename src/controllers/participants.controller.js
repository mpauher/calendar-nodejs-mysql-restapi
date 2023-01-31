class ParticipantController {

    participantModel = null;

    constructor(participantModel){
        this.participantModel = participantModel;
    }

    index(){
        return async (req,res) =>{
            try {
                const response = await this.participantModel.findAll();
                res.send(response);
            } catch (error) {
                res.status(500).json({
                    message: error.message
                });
            }
        }
    }
    
    show = async (req, res) => {
        try {
            const id = req.params.id;
            const participant = await this.participantModel.findOne(id);

            res.send(participant);

        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const { name, lastname, email } = req.body;
            const response = await this.participantModel.create(name, lastname, email);
            res.send(response);
        } catch (error) {
            res.status(500).json({
              message: error.message
            });
        }
    }

    filter = async (req,res) => {
        try {
            const id = req.params.id;
            const participants = await this.participantModel.filterParticipants(id);
    
            res.send(participants);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }

    }
}

export default ParticipantController;