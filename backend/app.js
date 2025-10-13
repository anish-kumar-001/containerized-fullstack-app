const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Essential for parsing POST request bodies

// FIX: Explicitly handle CORS Preflight for all routes
// This is critical for the browser to allow POST/PUT/DELETE requests.
app.options('*', cors()); 

// MySQL Connection Setup
const db = mysql.createConnection({
  host: "mysql-container",
  user: "root",
  password: "password",
  database: "mydb"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); 
  }
  console.log("Connected to MySQL Database");
});

// 1. API to FETCH/READ data (GET)
app.get("/data", (req, res) => {
  db.query("SELECT id, name, email FROM users", (err, result) => {
    if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "Failed to fetch users." });
    }
    res.json(result);
  });
});

// 2. API to ADD/CREATE data (POST)
app.post("/users/add", (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
  }

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ error: "Failed to add user to database." });
    }
    
    // Respond with success and the ID of the new user
    res.status(201).json({ 
      message: "User added successfully", 
      userId: result.insertId 
    });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});