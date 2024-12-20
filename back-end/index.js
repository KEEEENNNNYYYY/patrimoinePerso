const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pg = require("pg");
const fs = require("fs");
const cors = require('cors');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: 'https://patrimoineperso.onrender.com', // Retirez le slash final
  credentials: true
}));


app.use(express.json()); // Middleware pour analyser le JSON

// Configuration de la base de données PostgreSQL
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
};

const client = new pg.Client(config);
client.connect();

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Extraire le token après "Bearer"
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Route pour l'enregistrement des utilisateurs
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Vérification de l'existence de l'utilisateur
  const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
  if (result.rows.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insertion de l'utilisateur dans la base de données
  const insertResult = await client.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
    [email, hashedPassword]
  );

  const user = insertResult.rows[0];
  res.status(201).json({ message: "User created", user });
});

// Route pour le login des utilisateurs
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Recherche de l'utilisateur dans la base de données
  const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Vérification du mot de passe
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Création du token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Le token expirera dans 1 heure
  });

  res.status(200).json({ message: "Login successful", token });
});

// Route protégée pour obtenir les informations de l'utilisateur
app.get('/me', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email
    }
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
