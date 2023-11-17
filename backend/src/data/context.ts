import sqlite3 from "sqlite3";

export const context = new sqlite3.Database("./data/database.sqlite");

export function migrate() {
  context.run(`
    CREATE TABLE IF NOT EXISTS Users
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        address TEXT,
        phone TEXT,
        email TEXT,
        isChecked INTEGER
      )
  `);
}
