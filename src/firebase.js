import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAYHuAX6LUmS6J22X81RadB4wLaO8cqsi4",
    authDomain: "messenger-clone-4b201.firebaseapp.com",
    projectId: "messenger-clone-4b201",
    storageBucket: "messenger-clone-4b201.appspot.com",
    messagingSenderId: "398293536273",
    appId: "1:398293536273:web:7f9ef235b27739bcd4ebb0",
    measurementId: "G-VPHE4BZZ88"
});

const db = firebaseApp.firestore();

export default db;