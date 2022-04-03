import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import {
    getAuth,
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';
import {
    doc,
    setDoc,
    getFirestore,
    Timestamp,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: 'AIzaSyCK2QsbpmTtI7EuYeLxrxyn0g3rC2RhGHM',
    authDomain: 'bleg-421b0.firebaseapp.com',
    projectId: 'bleg-421b0',
    storageBucket: 'bleg-421b0.appspot.com',
    messagingSenderId: '530325002809',
    appId: '530325002809',
    measurementId: 'G-GMBKWP115L',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const ggProvider = new GoogleAuthProvider();
const db = getFirestore();
const storage = getStorage(app);


export { app, auth, ggProvider, db, setDoc, getFirestore, Timestamp, getStorage, ref, uploadBytes, getDownloadURL, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, doc, signOut, firebaseConfig, GoogleAuthProvider, createUserWithEmailAndPassword, storage }