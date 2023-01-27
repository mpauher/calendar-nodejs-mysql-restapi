import {createPool} from 'mysql2/promise'

export const database = createPool({
    host : '127.0.0.1',
    user : 'root',
    password : 'password',
    port : 3306,
    database : 'calendar_node'
})

