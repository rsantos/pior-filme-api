import db from "../database/connection";

export interface Movie {
  id?: number;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}


export const MovieModel = {
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
  },

  create(data: Omit<Movie, 'id'>): Movie {
    const stmt = db.prepare(`
      INSERT INTO movies (year, title, studios, producers, winner)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(data.year, data.title, data.studios, data.producers, data.winner ? 1 : 0);
    return { id: result.lastInsertRowid as number, ...data };
  },
}
