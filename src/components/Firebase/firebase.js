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

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.firestore = app.firestore();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  
  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);
 
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
 
  doSignOut = () => this.auth.signOut();
 
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  getFirestore() {
    return this.firestore;
  }

  timestampFrom(date) {
    return app.firestore.Timestamp.fromDate(date);
  }
  
}

export default Firebase;
