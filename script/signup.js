import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    auth,
    app,
    ggProvider
} from './modules/config.js';
import validate from './modules/validate.js';

const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const repeatPasswordInput = document.getElementById('repeat-password-input');
const textNode = document.querySelectorAll('.text-node');
const submitBtn = document.getElementById('submit-btn');
const ggBtn = document.getElementById('gg-btn');
const overlay = document.querySelector('.su-overlay');
const popupHeader = document.getElementById('popup-header');
const popupContent = document.getElementById('popup-content');
const popupLink = document.getElementById('popup-link');

let isCorrectEmail = false;
let isCorrectPassword = false;
let isCorrectRepeatPassword = false;

emailInput.addEventListener('focusout', () => {
    isCorrectEmail = Boolean(
        validate({
            type: 'email',
            node: emailInput,
            textNode: textNode[0],
        })
    );
});
passwordInput.addEventListener('focusout', () => {
    isCorrectPassword = validate({
        type: 'password',
        node: passwordInput,
        min: 8,
        textNode: textNode[1],
    });
});
repeatPasswordInput.addEventListener('focusout', () => {
    let password = passwordInput.value;
    isCorrectRepeatPassword = validate({
        type: 'repeat-password',
        node: repeatPasswordInput,
        password,
        textNode: textNode[2],
    });
});
submitBtn.addEventListener('click', () => {
    let email = emailInput.value;
    let password = passwordInput.value;
    if (isCorrectEmail && isCorrectPassword && isCorrectRepeatPassword) {
        createNewUser(email, password);
    }
});

ggBtn.addEventListener('click', signinWithGoogle);

function createNewUser(email, password) {
    checkUserInfo();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .then(() => {
            showPopup(
                'Success',
                "You've signed up sucessfully",
                './add_info.html',
                'Continue'
            );
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            let errorMes = errorMessage
                .split('/')[1]
                .slice(0, -2)
                .split('-')
                .join(' ');
            console.error(error);
            showPopup('Error', errorMes, './signup.html', 'Try Again');
        });
}

function signinWithGoogle() {
    signInWithPopup(auth, ggProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            auth.currentUser = user;
        })
        .then(() => {
            console.log(auth.currentUser);
            if (
                auth.currentUser.metadata.creationTime !==
                auth.currentUser.metadata.lastSignInTime
            ) {
                showPopup(
                    'Success',
                    "You've signed in sucessfully",
                    '../index.html',
                    'Continue'
                );
            } else {
                showPopup(
                    'Success',
                    "You've signed up sucessfully",
                    './add_info.html',
                    'Continue'
                );
            }
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            let errorMes = errorMessage
                .split('/')[1]
                .slice(0, -2)
                .split('-')
                .join(' ');
            console.error(error);
            showPopup('Error', errorMes, './signin.html', 'Try Again');
        });
}

function showPopup(header, content, url, linkText) {
    popupHeader.innerText = header;
    popupContent.innerText = content;
    popupLink.innerText = linkText;
    popupLink.href = url;
    overlay.classList.add('overlay-active');
}

function checkUserInfo() {
    isCorrectEmail = Boolean(
        validate({
            type: 'email',
            node: emailInput,
            textNode: textNode[0],
        })
    );
    let password = passwordInput.value;
    isCorrectRepeatPassword = validate({
        type: 'repeat-password',
        node: repeatPasswordInput,
        password,
        textNode: textNode[2],
    });
    isCorrectPassword = validate({
        type: 'password',
        node: passwordInput,
        min: 8,
        textNode: textNode[1],
    });
}