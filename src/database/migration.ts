import db from "./connection";


export default class Migration {
  static run() {
    db.exec(`
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER NOT NULL,
        title TEXT NOT NULL,
        studios TEXT NOT NULL,
        winner BOOLEAN NOT NULL
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS producers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS movie_producers (
        movie_id INTEGER NOT NULL,
        producer_id INTEGER NOT NULL,
        FOREIGN KEY (movie_id) REFERENCES movies(id),
        FOREIGN KEY (producer_id) REFERENCES producers(id),
        PRIMARY KEY (movie_id, producer_id)
      );
    `);
  }
}
