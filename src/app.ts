import express from 'express';
import producersRouter from './routes/producers.router';
import moviesRouter from './routes/movies.router';
import Migration from './database/migration';
import Seed from './database/seed';


const app = express();

app.use(express.json());

app.use('/producers', producersRouter);
app.use('/movies', moviesRouter);

export async function initializeApp(options?: { seedFilePathCSV?: string }) {
  Migration.run();
  await new Seed().run(options?.seedFilePathCSV);
  return app;
}

export default app;
