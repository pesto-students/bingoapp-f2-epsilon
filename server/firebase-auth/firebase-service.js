// require("firebase/auth");
// const firebase = require("firebase");
var admin = require("firebase-admin");
var serviceAccount = require("../bingo-c6392-firebase-adminsdk-cezx5-4d1f04486f.json");

// var firebaseConfig = {
//   apiKey: "AIzaSyDoKIc85Tp45pGL5JNd44LYmUE_nEz4uRI",
//   authDomain: "bingo-c6392.firebaseapp.com",
//   projectId: "bingo-c6392",
//   storageBucket: "bingo-c6392.appspot.com",
//   messagingSenderId: "179792748051",
//   appId: "1:179792748051:web:77cf9c75d24039ae9f69e6",
//   measurementId: "G-YS63BP9YK1",
// };

// firebase.initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { admin };
