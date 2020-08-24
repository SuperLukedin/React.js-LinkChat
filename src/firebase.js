import firebase from 'firebase'

const firebaseConfig = firebase.initializeApp({
    //input your own firebase config
  });

  const db = firebase.firestore();

  export default db