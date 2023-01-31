import {database} from '../database/connection.js'

class ParticipantModel{

    database = database;

    constructor(name, lastname, email){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
    }

    findAll = async () => {
        try {
            const [rows] = await database.query('SELECT * FROM participants')
            return rows;
        } catch (error) {
            throw new Error('Something went wrong'+ error)
        }
    }
    
    findOne = async (id) => {
        try {
            const [rows] = await database.query(`SELECT * FROM participants WHERE id = ${id}`);

            if (!rows.length) {
                throw new Error('Participant not found');
            }

            return rows[0];
    
        } catch (error) {
            throw error;
        }
    }
    
    create = async (name, lastname, email) => {
        try {
            const [rows] = await database.query(`INSERT INTO participants (name, lastname, email) VALUES ("${name}","${lastname}","${email}")`);

            return {
                id: rows.insertId,
                affected_rows: rows.affectedRows
            };

        } catch (error) {
            throw new Error('Something went wrong'+ error)
        }
    };

    filterParticipants = async (id) => {
        try {
            const [rows] = await this.database.query(
                `SELECT p.name, p.lastname, p.email 
                FROM participants p 
                INNER JOIN events_participants ep 
                ON p.id = ep.participant_id
                WHERE ep.event_id = ${id}`
            );
              
            return rows;
                    
        } catch (error) {
            return res.status(500).json({
                message: 'Something went wrong'
            })
        }
    }


          
}

export default ParticipantModel;


