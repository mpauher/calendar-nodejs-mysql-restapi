class EventController {
    eventModel = null;

    constructor(eventModel){
        this.eventModel = eventModel;
    }

    index(){
        return async (req,res) => {
            try {
                const response = await this.eventModel.findAll();
                res.send(response);
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    message: error
                });
            }
        } 
    }
   
    show = async (req, res) => {
        try {
            const id = req.params.id;
            const event = await this.eventModel.findOne(id);

            res.send(event);

        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    
    create = async (req, res) => {
        try {
            const data  = req.body;
            const { title, subject, description, start_date, finish_date } = data
            const response = await this.eventModel.create(title, subject, description, start_date, finish_date);
            res.send(response);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    filter(){
        return async (req, res) => {
            try {
                const filters = {};
    
                if (req.query.id) filters.id = req.query.id;
                if (req.query.start_day) filters.start_day = req.query.start_day;
                if (req.query.end_day) filters.end_day = req.query.end_day;
                if (req.query.start_month) filters.start_month = req.query.start_month;
                if (req.query.end_month) filters.end_month = req.query.end_month;
                if (req.query.start_year) filters.start_year = req.query.start_year;
                if (req.query.end_year) filters.end_year = req.query.end_year;
            
                const events = await this.eventModel.filterEvents(filters);
                res.send(events);
    
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        }
    }
}

export default EventController;