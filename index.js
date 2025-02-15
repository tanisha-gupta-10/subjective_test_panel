import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

// Create MySQL Connection
const db = mysql.createPool({
  connectionLimit: 2,
  host: "mysql.railway.internal", // Replace with actual host
  user: "root",
  password: "qzfewHYcJuNGKCmNvpUUzWvAdIBTkWEr",
  database: "railway",
  debug: false
});

// Test Database Connection
db.query("SELECT 1", (err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected successfully!");
  }
});

// Routes
app.get("/", (req, res) => {
  res.render("login");
});

app.post("/signup", (req, res) => {
  const { name, phoneNumber, email, password } = req.body;

  db.query(
    "INSERT INTO users (name, phoneNumber, email, password) VALUES (?, ?, ?, ?)",
    [name, phoneNumber, email, password],
    (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).send("Error inserting user");
      }
      res.redirect("/dashboard");
    }
  );
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
