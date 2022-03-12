import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { firebaseConfig } from './modules/config.js'
import validate from './modules/validate.js'


const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const textNode = document.querySelectorAll('.text-node');
const submitBtn = document.getElementById('submit-btn');
const ggBtn = document.getElementById('gg-btn');


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
let isCorrectEmail = false;
let isCorrectPassword = false;


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
submitBtn.addEventListener('click', () => {
    let email = emailInput.value;
    let password = passwordInput.value;
    if (isCorrectEmail == isCorrectPassword == true) {
        signInUser(email, password)
    };
})
ggBtn.addEventListener('click', createNewUserWithGoogle);

function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
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
            // ..
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
            auth.currentUser = user;
            console.log(user)
        })
        .then(() => {
            window.location.href = '../index.html';
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })

}