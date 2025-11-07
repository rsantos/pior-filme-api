import Database from "better-sqlite3";


class DatabaseConnection {
  private static instance: Database.Database;

  private constructor() {}

  public static getInstance(): Database.Database {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new Database(':memory:');
    }
    return DatabaseConnection.instance;
  }
}

export default DatabaseConnection;
