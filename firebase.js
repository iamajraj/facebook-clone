import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBmaoQrBkeRT2BjaR2ZTjrNpclSbbq2bN8",
    authDomain: "fb-clone-nextjs-5b10b.firebaseapp.com",
    projectId: "fb-clone-nextjs-5b10b",
    storageBucket: "fb-clone-nextjs-5b10b.appspot.com",
    messagingSenderId: "604245414883",
    appId: "1:604245414883:web:709dc25f7508ea73f046d6"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app;
const db = firebase.firestore();
const storage = firebase.storage();

export {db, storage};