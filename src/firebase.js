import firebase from 'firebase'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAEEatZs5wX3CAWi6bQwG_-2aXQkToETac",
    authDomain: "facebook-messenger-clone-b2433.firebaseapp.com",
    databaseURL: "https://facebook-messenger-clone-b2433.firebaseio.com",
    projectId: "facebook-messenger-clone-b2433",
    storageBucket: "facebook-messenger-clone-b2433.appspot.com",
    messagingSenderId: "511101846411",
    appId: "1:511101846411:web:ad08820106d637ded7258e",
    measurementId: "G-5LBNFC3GGY"
  });

  const db = firebase.firestore();

  export default db