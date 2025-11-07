import DatabaseConnection from "./connection";


export function runMigrations() {
  const db = DatabaseConnection.getInstance();

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

  console.log("Migrations have been run successfully.");
}
