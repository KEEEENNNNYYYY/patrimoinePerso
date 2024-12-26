// const admin = require('firebase-admin');
// const serviceAccount = require('./ca.pem');
// const { firebaseAdminConfig } = require('./firebase-config');


// // const admin = require('firebase-admin');
// // const serviceAccount = require('./ca.pem'); // Chemin vers le fichier PEM

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'postgres://avnadmin:AVNS_FC6mAvRkRtd3qi6Sw6G@pg-1f538d92-patrimoine-d-b.j.aivencloud.com:23226/defaultdb?sslmode=require',
// });
// module.exports = admin;
const admin = require('firebase-admin');
require('dotenv').config(); // Charge les variables d'environnement

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Remplace les \\n par \n pour la clé privée
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID,
  authUri: process.env.FIREBASE_AUTH_URI,
  tokenUri: process.env.FIREBASE_TOKEN_URI,
  authProviderCertUrl: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  clientCertUrl: process.env.FIREBASE_CLIENT_CERT_URL,
  universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
}; // Charge les informations Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
