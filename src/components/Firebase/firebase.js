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

  getAuth() {
    return this.auth;
  }
  getDB() {
    return this.db;
  }
  getDBRef(path) {
    return this.db.ref(path);
  }
  getFieldValue() {
    return this.wholeSystem.firestore.FieldValue;
  }
  getFS() {
    return this.firestore;
  }
  getFSDocRef(path) {
    return this.firestore.doc(path);
  }
  getFSCollectionRef(path) {
    return this.firestore.collection(path);
  }
  getFunctions() {
    return app.functions();
  }
  getRecaptcha(c, info) {
    return new this.wholeSystem.auth.RecaptchaVerifier(c,info);
  }
  getStorageRef(path) {
    return this.storage.ref(path);
  }
  getStorageRefFromURL(url) {
    return this.storage.refFromURL(url);
  }
  getSystem() {
    return this.wholeSystem;
  }

  // Firebase timestamps
  createTimestamp(seconds, nanoseconds) {
    return new this.wholeSystem.firestore.Timestamp(seconds, nanoseconds);
  }
  getTimestamp(date) {
    return this.wholeSystem.firestore.Timestamp.fromDate(date);
  }
}