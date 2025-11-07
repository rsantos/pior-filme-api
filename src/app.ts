import express from 'express';
import producersRouter from './routes/producers.router';
import { runMigrations } from './database/migrations';


const app = express();

app.use(express.json());

runMigrations();

app.use('/producers', producersRouter);

export default app;
