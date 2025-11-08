import db from "../database/connection";
import { Movie } from '../models/movie.model';

export default class MovieRepository {
  findAll(): Movie[] {
    const stmt = db.prepare(`
      SELECT m.id, m.year, m.title, m.studios, m.winner, p.id as producer_id, p.name as producer_name
        FROM movies as m
        JOIN movie_producers as mp ON m.id = mp.movie_id
        JOIN producers as p ON mp.producer_id = p.id
       ORDER BY m.year ASC
    `);
    const rows = stmt.all();
    return this.transformRowsToMovies(rows);
  }

  findWinners(): Movie[] {
    const stmt = db.prepare(`
      SELECT m.id, m.year, m.title, m.studios, m.winner, p.id as producer_id, p.name as producer_name
        FROM movies as m
        JOIN movie_producers as mp ON m.id = mp.movie_id
        JOIN producers as p ON mp.producer_id = p.id
       WHERE winner = 1
       ORDER BY m.year ASC
    `);
    const rows = stmt.all();
    return this.transformRowsToMovies(rows);
  }

  create(data: Omit<Movie, 'id'>): Movie {
    const { year, title, studios, winner } = data;
    const stmt = db.prepare(`
          INSERT INTO movies (year, title, studios, winner)
          VALUES (?, ?, ?, ?)
        `);
    const result = stmt.run(year, title, studios, winner ? 1 : 0);
    return { id: result.lastInsertRowid as number, ...data };
  }

  private transformRowsToMovies(rows: any[]): Movie[] {
    const movies: Movie[] = [];

    for (const row of rows as any) {
      let movie = movies.find(m => m.id === row.id);
      if (!movie) {
        movie = {
          id: row.id,
          year: row.year,
          title: row.title,
          studios: row.studios,
          winner: row.winner === 1,
          producers: [],
        };
        movies.push(movie);
      }
      movie.producers!.push({ id: row.producer_id, name: row.producer_name });
    }

    return movies;
  }
}