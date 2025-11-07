import path from 'path';
import fs from 'node:fs';
import MovieService from '../services/movie.service';


export default class Seed {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  async run(filePathCSV?: string) {
    const filePath = filePathCSV ? path.resolve(filePathCSV) : path.resolve('src/data/movies.csv');

    if (!fs.existsSync(filePath)) {
      console.warn(`Seed file not found at path: ${filePath}`);
      return;
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n').slice(1);
    for (const line of lines) {
      const [year, title, studios, producers, winner] = line.split(';');
      if (!title || !studios || !producers) {
        continue;
      }

      this.movieService.createMovie({
        year: Number(year),
        title,
        studios,
        producers,
        winner: winner.trim().toLowerCase() === 'yes',
      });
    }
  }
}