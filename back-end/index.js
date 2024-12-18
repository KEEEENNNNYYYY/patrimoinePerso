const fs = require("fs");
const pg = require("pg");
require('dotenv').config();  // Charger les variables d'environnement depuis le fichier .env

const config = {
  user: process.env.DB_USER,  // Lire l'utilisateur depuis le fichier .env
  password: process.env.DB_PASSWORD,  // Lire le mot de passe depuis le fichier .env
  host: process.env.DB_HOST,  // Lire l'hôte depuis le fichier .env
  port: process.env.DB_PORT,  // Lire le port depuis le fichier .env
  database: process.env.DB_NAME,  // Lire le nom de la base de données depuis le fichier .env
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(), // Lire le certificat SSL depuis le chemin dans .env
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
