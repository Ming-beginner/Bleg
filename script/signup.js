import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { firebaseConfig } from './modules/config.js'
import validate from './modules/validate.js'


const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const repeatPasswordInput = document.getElementById('repeat-password-input');
const textNode = document.querySelectorAll('.text-node');
const submitBtn = document.getElementById('submit-btn');
const ggBtn = document.getElementById('gg-btn');


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
let isCorrectEmail = false;
let isCorrectPassword = false;
let isCorrectRepeatPassword = false;


emailInput.addEventListener('focusout', () => {
    isCorrectEmail = Boolean(validate({
        type: 'email',
        node: emailInput,
        textNode: textNode[0]
    }))
});
passwordInput.addEventListener('focusout', () => {
    isCorrectPassword = validate({
        type: 'password',
        node: passwordInput,
        min: 8,
        textNode: textNode[1]
    })
});
repeatPasswordInput.addEventListener('focusout', () => {
        let password = passwordInput.value;
        isCorrectRepeatPassword = validate({
            type: 'repeat-password',
            node: repeatPasswordInput,
            password,
            textNode: textNode[2]
        })
    })
    /* submitBtn.addEventListener('click', () => {
        let email = emailInput.value;
        let password = passwordInput.value;
        if (isCorrectEmail == isCorrectPassword == isCorrectRepeatPassword == true) {
            createNewUser(email, password)
        };
    }) */
ggBtn.addEventListener('click', createNewUserWithGoogle);

function createNewUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)

        })
        .then(() => {
            window.location.href = '../index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error.message)
        });
}

function createNewUserWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
        })
        .then(() => {
            window.location.href = '../index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}