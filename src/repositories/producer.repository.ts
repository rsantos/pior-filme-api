import { Producer } from '../models/producer.model';
import db from "../database/connection";

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
}
