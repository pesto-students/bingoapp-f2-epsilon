var admin = require("firebase-admin");

var serviceAccount = require("../bingo-c6392-firebase-adminsdk-cezx5-4d1f04486f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});