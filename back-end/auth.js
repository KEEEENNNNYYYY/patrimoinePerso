const express = require('express');
const router = express.Router();
const admin = require('./firebase-admin'); // Importer Firebase Admin SDK

// Route de connexion
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Retourne les informations de l'utilisateur et le token JWT
    res.json({
      uid: user.uid,
      email: user.email,
      token: await user.getIdToken(),
    });
  } catch (error) {
    console.error('Erreur de connexion :', error);
    res.status(401).json({ error: 'Échec de la connexion', message: error.message });
  }
});

module.exports = router;
