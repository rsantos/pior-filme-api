import db from '../database/connection';

export default class MovieProducerRepository {
  attachProducersToMovie(movieId: number, producerIds: number[]): void {
    const insertStmt = db.prepare(`
      INSERT INTO movie_producers (movie_id, producer_id)
      VALUES (?, ?)
    `);
    const insertMany = db.transaction((ids: number[]) => {
      for (const producerId of ids) {
        insertStmt.run(movieId, producerId);
      }
    });
    insertMany(producerIds);
  }
}
