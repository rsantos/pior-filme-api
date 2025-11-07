import express from 'express';
import producerRouter from './routes/producer.router';


const app = express();

app.use(express.json());

app.use('/producers', producerRouter);

export default app;
