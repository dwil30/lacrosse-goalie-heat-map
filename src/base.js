import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAeFREEwxlzE0haKb9rOt91BQia3Ceyjrk",
    authDomain: "lax-goalie-rat.firebaseapp.com",
    databaseURL: "https://lax-goalie-rat.firebaseio.com",
    projectId: "lax-goalie-rat",
    storageBucket: "",
    messagingSenderId: "149428715395"
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { app, base, facebookProvider, twitterProvider, googleProvider }
