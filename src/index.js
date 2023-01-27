import express from 'express';
import eventsRoutes from './routes/events.routes.js';
import participantsRoutes from './routes/participants.routes.js'

const app = express();

app.use('/api',eventsRoutes)
app.use('/api',participantsRoutes)


app.listen(9000);

console.log('Server running on port 9000');