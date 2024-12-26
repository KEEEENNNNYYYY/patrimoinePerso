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
const serviceAccount = require('./mypatrimoineapi-firebase-adminsdk-xmpls-ab41553080.json'); // Charge les informations Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
