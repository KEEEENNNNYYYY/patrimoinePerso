const fs = require("fs");
const pg = require("pg");
require('dotenv').config();

// Configuration de la base de données
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

client.connect(function (err) {
  if (err) throw err;
  client.query("SELECT VERSION()", [], function (err, result) {
    if (err) throw err;

    console.log(result.rows[0]);
    client.end(function (err) {
      if (err) throw err;
    });
  });
});

// Ajout de la partie serveur HTTP qui écoute sur le port de Render
const http = require("http");

// Récupération du port à utiliser (Render le définit dans process.env.PORT)
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Backend is running');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
