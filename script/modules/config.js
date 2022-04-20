import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import {
    getAuth,
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    updateEmail,
    updatePassword
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';
import {
    doc,
    collection,
    query,
    setDoc,
    getDoc,
    getDocs,
    getFirestore,
    Timestamp,
    updateDoc
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

const tagList = [
    'News',
    'Web Development',
    'Mobile Development',
    'Artificial Intelligent',
    'Data Science',
    'Block Chain',
    'DSA',
    'Life Style',
    'Travel',
    'Food',
];

export default function isSignedIn(callback) {
    return onAuthStateChanged(auth, user => {
        if (!user) {
            callback();
            return false;
        }
        return true;
    })
}

export { app, auth, ggProvider, db, setDoc, getFirestore, Timestamp, getStorage, ref, uploadBytes, getDownloadURL, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, doc, signOut, firebaseConfig, GoogleAuthProvider, createUserWithEmailAndPassword, getDoc, storage, tagList, updateEmail, updatePassword, collection, query, getDocs, updateDoc, }