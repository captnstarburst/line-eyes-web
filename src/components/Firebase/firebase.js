import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';
import 'firebase/functions';

const config = {
  apiKey: "AIzaSyB22bMbvLa0Caly9wVrBPlMOKl_euS6Vp4",
  authDomain: "line-eyez.firebaseapp.com",
  databaseURL: "https://line-eyez.firebaseio.com",
  projectId: "line-eyez",
  storageBucket: "line-eyez.appspot.com",
  messagingSenderId: "829574106248",
  appId: "1:829574106248:web:6d0c896dfb3af1e620233d",
  measurementId: "G-ZDBMNDGK0W"
};

export default class Firebase {
  constructor() {
    app.initializeApp(config);
    app.auth().useDeviceLanguage();
    app.functions();
    this.wholeSystem = app;
    this.db = app.database();
    this.firestore = app.firestore();
    this.storage = app.storage();
    this.auth = app.auth();
  }

  // *** Auth API ***
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        next(authUser);
      } else {
        fallback();
      }
    }
  );

  // Firebase authentications
  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  doSignOut() {
    return this.auth.signOut();
  }
  doPasswordReset(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  // Firebase references
  getCurrentUser() {
    return this.auth.currentUser()
  }
  
  // Firebase timestamps
  createTimestamp(seconds, nanoseconds) {
    return new this.wholeSystem.firestore.Timestamp(seconds, nanoseconds);
  }
  getTimestamp(date) {
    return this.wholeSystem.firestore.Timestamp.fromDate(date);
  }
}