import {database} from '../database/connection.js'

class EventModel{

    database = database;

    constructor(title, subject, start_date, finish_date, description){
        this.title = title;
        this.subject = subject;
        this.start_date = start_date;
        this.finish_date = finish_date;
        this.description = description;
    }

    async findAll(){
        try {
            const [rows] = await this.database.query('SELECT * FROM events')
            return rows;
            
        } catch (error) {
            throw new Error('Something went wrong'+ error)            
        }
    }

    async findOne(id){
        try {
            const [rows] = await this.database.query(`SELECT * FROM events where id = ${id}`)

            if (!rows.length) {
                throw new Error ('Event not found')
            }

            return rows[0];
                    
        } catch (error) {
            throw error;
        }
    }

    create = async (title,subject,description,start_date,finish_date) => {
        try {
            const [rows] = await this.database.query(`INSERT INTO events (title,subject,description,start_date,finish_date) VALUES ("${title}","${subject}","${description}", "${start_date}", "${finish_date}")`)

            return {
                id: rows.insertId,
                affected_rows: rows.affectedRows
            };
                    
        } catch (error) {
            throw new Error('Something went wrong'+ error)
        }
    }

    filterEvents = async (filters) => {
        try {
            let query = `
                SELECT e.title, e.subject, e.description 
                FROM events e 
                INNER JOIN events_participants ep 
                ON e.id = ep.event_id
            `;
                  
            const conditions = [];
              
            if (filters.id) conditions.push(`ep.participant_id = ${filters.id}`);
            if (filters.day) conditions.push(`day(e.start_date) = ${filters.day}`);
            if (filters.month) conditions.push(`month(e.start_date) = ${filters.month}`);
            if (filters.year) conditions.push(`year(e.start_date) = ${filters.year}`);
            
            if (conditions.length > 0) {
                query += " WHERE " + conditions.join(" AND ");
            }
                  
            const [rows] = await database.query(query);
              
            return rows;
                    
        } catch (error) {
            return res.status(500).json({
                message: 'Something went wrong'
            })
        }
    }
}

export default EventModel;

