import { Database } from "sqlite3";
import { open } from "sqlite";

// Function to open the SQLite database
export async function initDB() {
  const db = await open({
    filename: "./comments.db",
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
