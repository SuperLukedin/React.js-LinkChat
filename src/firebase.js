import firebase from 'firebase'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDTSemYSFxLH8kekPvHNPp-r5EcTIeMGe4",
    authDomain: "little-chat-now.firebaseapp.com",
    databaseURL: "https://little-chat-now.firebaseio.com",
    projectId: "little-chat-now",
    storageBucket: "little-chat-now.appspot.com",
    messagingSenderId: "1000790721434",
    appId: "1:1000790721434:web:c4a3a8e87c3776b644b023",
    measurementId: "G-HQP78RSY3G"
  });

  const db = firebase.firestore();

  export default db