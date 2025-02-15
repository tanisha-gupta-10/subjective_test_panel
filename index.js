import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

dotenv.config(); // Load environment variables

// Create MySQL Connection
const db = mysql.createPool({
  host: "mysql-production-5f6b.up.railway.app",
  user: "root",
  password: "vgivmiNUPkCXQYpxzGTIbSHOjbQjxAPX",
  database: "railway",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

// Test Database Connection
db.query("SELECT 1", (err, results) => {
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

// app.post("/signup", (req, res) => {
//   const { name, phoneNumber, email, password } = req.body;

//   db.query(
//     "INSERT INTO users (name, phoneNumber, email, password) VALUES (?, ?, ?, ?)",
//     [name, phoneNumber, email, password],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting user:", err);
//         return res.status(500).send("Error inserting user");
//       }
//       res.redirect("/dashboard");
//     }
//   );
// });

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
