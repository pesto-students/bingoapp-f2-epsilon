import firebase from "firebase/app";
import "firebase/auth";


const app = firebase.initializeApp({
  apiKey: "AIzaSyDoKIc85Tp45pGL5JNd44LYmUE_nEz4uRI",
  authDomain: "bingo-c6392.firebaseapp.com",
  projectId: "bingo-c6392",
  storageBucket: "bingo-c6392.appspot.com",
  messagingSenderId: "179792748051",
  appId: "1:179792748051:web:77cf9c75d24039ae9f69e6",
  measurementId: "G-YS63BP9YK1",
});

export const auth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export default app;
