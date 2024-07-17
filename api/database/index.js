/* eslint-disable no-console */
const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// 创建表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      avatar TEXT,
      nickname TEXT,
      bio TEXT,
      country TEXT,
      region TEXT
    )
  `);
});

module.exports = db;
