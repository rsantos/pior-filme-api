import express from 'express';
import producersRouter from './routes/producers.router';
import Migration from './database/migration';
import Seed from './database/seed';


const app = express();

app.use(express.json());

app.use('/producers', producersRouter);

export async function initializeApp() {
  Migration.run();
  await Seed.run();
  return app;
}

export default app;
