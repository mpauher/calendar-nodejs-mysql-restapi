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

            //Filter especific date

            let query = `
                SELECT e.title, e.subject, e.description , e.start_date
                FROM events e 
                LEFT JOIN events_participants ep 
                ON e.id = ep.event_id
                LEFT JOIN participants p            
                ON p.id = ep.participant_id 
            `;
                  
            const conditions = [];
              
            if (filters.id) conditions.push(`ep.participant_id = ${filters.id}`);
            if (filters.start_day) conditions.push(`day(e.start_date) = ${filters.start_day}`);
            if (filters.start_month) conditions.push(`month(e.start_date) = ${filters.start_month}`);
            if (filters.start_year) conditions.push(`year(e.start_date) = ${filters.start_year}`);
            
            if (conditions.length > 0) {
                query += " WHERE " + conditions.join(" AND ") + " GROUP BY e.id" ;
            }

            //Filter between two dates

            if(filters.start_day && filters.start_month && filters.start_year && filters.finish_year && filters.finish_month && filters.finish_year){

                query = `
                SELECT e.title, e.subject, e.description , e.start_date, e.finish_date
                FROM events e
                LEFT JOIN events_participants ep
                ON e.id = ep.event_id                    
            `

                const start_date = (`'${filters.start_year}-${filters.start_month}-${filters.start_day}'`)
                const finish_date = (`'${filters.finish_year}-${filters.finish_month}-${filters.finish_day}'`)

                const conditions = [];

                conditions.push(`start_date BETWEEN (${start_date}) AND (${finish_date})`)
                if (filters.id) conditions.push(`ep.participant_id = ${filters.id}`);

                if (conditions.length > 0) {
                    query += " WHERE " + conditions.join(" AND ") + " GROUP BY e.id" ;
                }
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

