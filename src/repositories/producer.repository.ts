import { Producer, ProducerAwardInterval } from '../models/producer.model';
import db from "../database/connection";

interface AwardIntervalRow {
  name: string;
  interval_years: number;
  previous_win: number;
  following_win: number;
}


export default class ProducerRepository {
  findOrCreate(name: string): Producer {
    const producerFounded = db.prepare('SELECT id FROM producers WHERE name = ?').get(name) as { id: number } | undefined;
    if (producerFounded) {
      return { id: producerFounded.id, name };
    }
    const insertStmt = db.prepare('INSERT INTO producers (name) VALUES (?)');
    const result = insertStmt.run(name);
    return { id: result.lastInsertRowid as number, name };
  }

  calculateAwardIntervals(intervalType: 'min' | 'max'): ProducerAwardInterval[] {
    const direction = intervalType === 'min' ? 'ASC' : 'DESC';
    const query = `
      select p.name, (max(m.year) - min(m.year)) as interval_years, min(m.year) as previous_win, max(m.year) as following_win
        from producers as p
        join movie_producers mp on mp.producer_id = p.id
        join movies m on m.id = mp.movie_id
       where m.winner = true
       group by p.name
      having count(m.id) > 1
       order by interval_years ${direction}
       limit 1
    `;
    const stmt = db.prepare(query).all() as Array<AwardIntervalRow>;

    return stmt.map(row => ({
      producer: row.name,
      interval: row.interval_years,
      previousWin: row.previous_win,
      followingWin: row.following_win,
    }));
  }
}
