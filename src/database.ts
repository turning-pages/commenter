import { Database } from "sqlite3";
import { open } from "sqlite";
import Config from "./config";

import * as path from "path";

const configReader = new Config();
configReader.loadConfig();
const dbFileLocation = configReader.get("dbFileLocation");

// Function to open the SQLite database
export async function initDB() {
  const db = await open({
    filename: dbFileLocation ? dbFileLocation : "./comments.db",
    driver: Database,
  });

  // Create the comments table if it doesn't exist
  await db.exec(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            page_path TEXT NOT NULL,
            comment TEXT NOT NULL,
            commenter TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

  return db;
}
