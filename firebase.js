import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app;
const db = firebase.firestore();
const storage = firebase.storage();

export {db, storage};