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
    const operator = intervalType === 'min' ? 'MIN' : 'MAX';
    const query = `
      with wins as (
        select p.id as producer_id, p.name, m.year, row_number() over (partition by p.id order by m.year) as win_order
          from producers p
          join movie_producers mp on mp.producer_id = p.id
          join movies m on m.id = mp.movie_id
         where m.winner = true
      ),
      intervals as (
        select w1.producer_id, w1.name, w1.year as previous_win, w2.year as following_win, (w2.year - w1.year) as interval_years
          from wins w1
          join wins w2 
            on w2.producer_id = w1.producer_id 
              and w2.win_order = w1.win_order + 1
      )
      select i.name, i.interval_years, i.previous_win, i.following_win
        from intervals i
       where i.interval_years = (select ${operator}(interval_years) from intervals);
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
