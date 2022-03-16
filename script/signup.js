import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { firebaseConfig } from './modules/config.js';
import validate from './modules/validate.js';

const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const repeatPasswordInput = document.getElementById('repeat-password-input');
const textNode = document.querySelectorAll('.text-node');
const submitBtn = document.getElementById('submit-btn');
const overlay = document.querySelector('.su-overlay');
const popupHeader = document.getElementById('popup-header');
const popupContent = document.getElementById('popup-content');
const popupLink = document.getElementById('popup-link');

const app = initializeApp(firebaseConfig);
const auth = getAuth();
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