import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import {
    getAuth,
    onAuthStateChanged,
    updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';
import { firebaseConfig } from './modules/config.js';
import validate from './modules/validate.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

const nameInput = document.getElementById('name-input');
const dateInput = document.getElementById('date-input');
const genderInput = document.getElementById('gender-input');
const submitBtn = document.getElementById('submit-btn');
const textNode = document.querySelectorAll('.text-node');
const avatarInput = document.getElementById('avatar-input');
const avatarPreview = document.getElementById('avatar-preview');
const fileInput = document.getElementById('file-input');
const submitBtn2 = document.getElementById('submit-btn2');
const returnBtn = document.getElementById('return-btn');
const formContainer = document.querySelector('.form-container');
let isCorrectName = false;
let isCorrectDate = false;
let name = '';
let dateOfBirth = '';
let gender = '';
let photoURL = '';

nameInput.addEventListener('focusout', () => {
    isCorrectName = validate({
        type: 'require',
        node: nameInput,
        textNode: textNode[0],
        error: 'Name is required',
    });
});
dateInput.addEventListener('change', () => {
    isCorrectDate = validate({
        type: 'require',
        node: dateInput,
        textNode: textNode[1],
    });
});
submitBtn.addEventListener('click', () => {
    checkUserInfo();
    if (isCorrectName && isCorrectDate) {
        name = nameInput.value;
        dateOfBirth = dateInput.value;
        gender = genderInput.value;
        formContainer.classList.add('form-container-avatar');
    }
});

avatarInput.addEventListener('change', () => {
    avatarPreview.src = avatarInput.value;
    photoURL = avatarInput.value;
});
fileInput.addEventListener('change', () => {
    let imgFile = fileInput.files[0];
    let imgType = imgFile.type.split('/')[1];
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            const userAvatar = ref(
                storage,
                'users/' + uid + '/avatar.' + imgType
            );
            uploadBytes(userAvatar, imgFile).then(() => {
                getDownloadURL(userAvatar).then((url) => {
                    avatarInput.value = url;
                    avatarPreview.src = url;
                    photoURL = avatarInput.value;
                });
            });
        } else {
            window.location.href = '../index.html';
        }
    });
});

submitBtn2.addEventListener('click', () => {
    photoURL = photoURL || '../asset/img/avatar.png';
    updateUserInfo(name, dateOfBirth, gender, photoURL);
});

returnBtn.addEventListener('click', () => {
    formContainer.classList.remove('form-container-avatar');
});

function updateUserInfo(name, dateOfBirth, gender, photoURL) {
    updateProfile(auth.currentUser, {
            displayName: name,
            dateOfBirth,
            gender,
            photoURL,
        })
        .then(() => {
            window.location.href = '../index.html';
        })
        .catch((error) => {
            alert(error.message);
        });
}

function checkUserInfo() {
    isCorrectName = validate({
        type: 'require',
        node: nameInput,
        textNode: textNode[0],
        error: 'Name is required',
    });
    isCorrectDate = validate({
        type: 'require',
        node: dateInput,
        textNode: textNode[1],
    });
}