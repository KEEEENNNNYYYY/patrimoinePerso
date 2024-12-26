const express = require('express');
const app = express();
const authRoutes = require('./auth'); // Import des routes d'authentification
const dashboardRoutes = require('./dashboard'); // Import des routes du dashboard

app.use(express.json()); // Middleware pour le body parsing
app.use('/api', authRoutes); // Ajoute la route d'authentification
app.use('/api', dashboardRoutes); // Ajoute la route du dashboard protégée

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
