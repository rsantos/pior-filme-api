import db from "../database/connection";
import { Movie } from '../models/movie.model';

export default class MovieRepository {
  findAll(): Movie[] {
    const stmt = db.prepare('SELECT * FROM movies');
    return stmt.all().map((row: any) => ({
      id: row.id,
      year: row.year,
      title: row.title,
      studios: row.studios,
      producers: row.producers,
      winner: row.winner === 1,
    }));
  }

  findWinners(): Movie[] {
    const stmt = db.prepare('SELECT * FROM movies WHERE winner = 1');
    return stmt.all().map((row: any) => ({
      id: row.id,
      year: row.year,
      title: row.title,
      studios: row.studios,
      producers: row.producers,
      winner: row.winner === 1,
    }));
  }

  create(data: Omit<Movie, 'id'>): Movie {
    const stmt = db.prepare(`
          INSERT INTO movies (year, title, studios, producers, winner)
          VALUES (?, ?, ?, ?, ?)
        `);
    const result = stmt.run(data.year, data.title, data.studios, data.producers, data.winner ? 1 : 0);
    return { id: result.lastInsertRowid as number, ...data };
  }
}