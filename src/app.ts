import express from 'express';
import producersRouter from './routes/producers.router';
import moviesRouter from './routes/movies.router';
import Migration from './database/migration';
import Seed from './database/seed';
import MovieService from './services/movie.service';
import MovieProducerRepository from './repositories/movie-producer.repository';
import MovieRepository from './repositories/movie.repository';
import ProducerRepository from './repositories/producer.repository';


const app = express();

app.use(express.json());

app.use('/producers', producersRouter);
app.use('/movies', moviesRouter);

export async function initializeApp(options?: { seedFilePathCSV?: string }) {
  Migration.run();
  await new Seed(
    new MovieService(
      new MovieRepository(),
      new MovieProducerRepository(),
      new ProducerRepository()
    )
  ).run(options?.seedFilePathCSV);
  return app;
}

export default app;
