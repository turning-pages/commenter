import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { initDB } from "./database";
import path from "path";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

app.use(
  "/comments.js",
  express.static(path.join(__dirname, "../", "public", "comments.js"))
);

app.use(
  "/comments.css",
  express.static(path.join(__dirname, "../", "public", "comments.css"))
);

// Initialize database
let db: any;
initDB()
  .then((database) => {
    db = database;
    console.log("Database initialized");
  })
  .catch((err) => console.error("Error initializing database:", err));

// Fetch all comments
app.get("/comments", async (req: Request, res: Response) => {
  try {
    const comments = await db.all(
      "SELECT * FROM comments ORDER BY created_at DESC"
    );
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Add a new comment
app.post("/comments", async (req: Request, res: Response) => {
  const { comment, commenter, path } = req.body;

  if (!comment) {
    res.status(400).json({ error: "Comment text is required" });
  }

  try {
    const result = await db.run(
      "INSERT INTO comments (comment, commenter, path) VALUES (?, ?, path)",
      [comment, commenter || "Anonymous", path]
    );

    if (result && result.lastID) {
      res.status(201).json({ id: result.lastID });
    } else {
      res.status(500).json({ error: "Failed to add comment" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

// Delete a comment (optional)
app.delete("/comments/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result: any = await db.run("DELETE FROM comments WHERE id = ?", id);
    if (result.changes === 0) {
      res.status(404).json({ error: "Comment not found" });
    } else {
      res.status(200).json({ message: "Comment deleted" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="/comments.css">
            </head>
            <body>
                <div id="comments-container"></div>
                <script src="/comments.js"></script>
            </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
