import {database} from './database/connection.js'

class ParticipantModel{

    index = async () => {
        try {
            const [rows] = await database.query('SELECT * FROM paticipants')
                    
        } catch (error) {
            return res.status(500).json({
                message: 'Something went wrong'
            })
        }

        const result = rows
        return result;
    }
    
    show = async (req, res) => {
        try {
            const [rows] = await database.query('SELECT * FROM paticipants WHERE id = ? ', [req.params.id])
    
            if (rows.length <= 0) return res.status(404).json({
                message : 'Participant not found'
            })            
            
        } catch (error) {
            return res.status(500).json({
                message: 'Something went wrong'
            })
        }

        const result = rows[0]
        return result;
    }
    
    create = async (req, res) => {
        try {
            const{name, lastname, email} = req.body
            const [rows] = await database.query('INSERT INTO participants (name, lastname,email) VALUES (?,?,?)', [name, lastname, email])
        
        } catch (error) {
            return res.status(500).json({
                message: 'Something went wrong'
            })
        }

        const result = {
            id : rows.insertId,
            affected_rows: rows.affectedRows
        }
        return result;
    }

}

module.exports = new ParticipantModel;



