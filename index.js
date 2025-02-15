import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";

const { json } = bodyParser;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(json());
app.set("view engine", "ejs");

// Create MySQL Connection
const connection = mysql.createConnection({
  host: "mysql.railway.internal",
  user: "root",
  password: "qzfewHYcJuNGKCmNvpUUzWvAdIBTkWEr",
});

// Connect to MySQL and Create Database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");

  connection.query("CREATE DATABASE IF NOT EXISTS restraunt", (err) => {
    if (err) {
      console.error("Error creating database:", err);
    } else {
      console.log("Database 'restraunt' created or already exists.");
    }
    connection.end(); // Close connection after query execution
  });
});

// Create MySQL Connection Pool
const db = mysql.createPool({
  connectionLimit: 2,
  host: "mysql.railway.internal",
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
  // const query = `
  //   SELECT sq.class_id, slc.name, ct.category, l.name as lang, b.name as board,
  //          sq.user_id, u.name as user_name, sq.created_at, ctt.category as sub_category_name
  //   FROM vidyakul.subjective_questions sq
  //   JOIN single_live_class slc ON sq.class_id = slc.id
  //   JOIN categories ct ON slc.subject_id = ct.id
  //   JOIN languages l ON slc.language_id = l.id
  //   JOIN board b ON slc.board_id = b.id
  //   JOIN users u ON u.id = sq.user_id
  //   JOIN categories ctt ON slc.sub_category_id = ctt.id;
  // `;

  // db.query(query, (err, results) => {
  //   if (err) {
  //     console.error("Error fetching data:", err);
  //     return res.status(500).send("Database query error");
  //   }

  //   results.forEach(row => {
  //     const date = new Date(row.created_at);
  //     row.formattedDate = date.toLocaleString("en-GB", {
  //       year: "numeric",
  //       month: "short",
  //       day: "2-digit",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //       hour12: false
  //     });
  //   });

  //   res.render("questions", { data: results });
  // });

  res.render("login");

});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
