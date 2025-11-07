import express from 'express';
import producersRouter from './routes/producers.router';
import { runMigrations } from './database/migrations';


const app = express();

app.use(express.json());

app.use('/producers', producersRouter);

export async function initializeApp() {
  runMigrations();
  return app;
}

export default app;
