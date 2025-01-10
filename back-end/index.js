const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./auth'); // Import des routes d'authentification
const dashboardRoutes = require('./dashboard'); // Import des routes du dashboard
const fs = require("fs");
const pg = require("pg");
const cors = require('cors');
app.use(cors());


// const db = require('./db');


app.use(express.json()); // Middleware pour le body parsing
app.use('/api', authRoutes); // Ajoute la route d'authentification
app.use('/api', dashboardRoutes); // Ajoute la route du dashboard protégée




const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('./ca.pem').toString(),
  },
  // connectionTimeoutMillis: 10000,  // Timeout de connexion 10 secondes
  // idleTimeoutMillis: 30000  
};

const client = new pg.Client(config);
client.connect(function (err) {
  if (err) throw err;
  client.query("SELECT VERSION()", [], function (err, result) {
    if (err) throw err;

    console.log(result.rows[0]);
    // client.end(function (err) {
    //   if (err) throw err;
    // });
  });
});


app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
// Démarrage du serveur
// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
