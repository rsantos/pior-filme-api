import db from "./connection";


export default class Migration {
  static run() {
    db.exec(`
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER NOT NULL,
        title TEXT NOT NULL,
        studios TEXT NOT NULL,
        producers TEXT NOT NULL,
        winner BOOLEAN NOT NULL
      );
    `);
  }
}
