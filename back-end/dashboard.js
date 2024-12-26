const express = require('express');
const router = express.Router();
const admin = require('./firebase-admin'); // Import Firebase Admin SDK

// Middleware pour vérifier le token
const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'Pas de token, accès non autorisé' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Erreur de vérification du token :', error);
    res.status(401).json({ error: 'Token invalide, accès non autorisé' });
  }
};

// Route protégée
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Accès au Dashboard autorisé', user: req.user });
});

module.exports = router;
