import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firebase-firestore";
import "firebase/firebase-storage";
import "firebase/functions";

const config = {
  apiKey: "AIzaSyB22bMbvLa0Caly9wVrBPlMOKl_euS6Vp4",
  authDomain: "line-eyez.firebaseapp.com",
  databaseURL: "https://line-eyez.firebaseio.com",
  projectId: "line-eyez",
  storageBucket: "line-eyez.appspot.com",
  messagingSenderId: "829574106248",
  appId: "1:829574106248:web:6d0c896dfb3af1e620233d",
  measurementId: "G-ZDBMNDGK0W",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.functions = app.functions();
    this.auth = app.auth();
    this.firestore = app.firestore();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  getFirestore() {
    return this.firestore;
  }

  useFunctions() {
    return this.functions;
  }

  currentUserUID() {
    return this.auth.currentUser.uid;
  }

  currentUserEmail() {
    return this.auth.currentUser.email;
  }
  async getRole() {
    const firestore = this.getFirestore();
    const uid = this.currentUserUID();

    const role = await firestore
      .doc("Users/" + uid + "/Role/Role")
      .get()
      .then((doc) => {
        return doc.data().role;
      });

    return role;
  }

  timestampFrom(date) {
    date.setDate(date.getDate() + 1);
    return app.firestore.Timestamp.fromDate(date);
  }
}

export default Firebase;
