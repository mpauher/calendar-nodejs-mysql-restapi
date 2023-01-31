import {database} from './connection.js'

database.getConnection()
    .then(connection => {
        console.log("Conexión exitosa a la base de datos")
        connection.release()
    })
    .catch(err => console.log("Error al conectarse a la base de datos: " + err))