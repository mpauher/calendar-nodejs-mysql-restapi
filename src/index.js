import express from 'express';
import eventsRoutes from './routes/events.routes.js';
import participantsRoutes from './routes/participants.routes.js'
import filterRoutes from './routes/filter.routes.js'

const app = express();

app.use(express.json())

app.get('/', (req, res) => {res.send('Hello World!')})  
app.use('/api',eventsRoutes)
app.use('/api',participantsRoutes)
app.use('/api',filterRoutes)

app.listen(7000);

console.log('Server running on port 7000');