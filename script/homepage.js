import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { firebaseConfig } from './modules/config.js'

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const navbarItem = document.getElementById('navbar-items');
const avatarPath = '../asset/img/avatar.png'

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user)
        navbarItem.innerHTML += `
    <li class="nav-item dropdown" >
                        <a class="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="${user.photoURL || avatarPath }" class="avatar" width="45px" alt="" />
                        </a>
                        <ul class="dropdown-menu" id="dropdown" aria-labelledby="navbarDropdown">
                            <li class="d-flex align-items-center  flex-column">
                                <img src=${user.photoURL || avatarPath} class="avatar" width="45px" alt="" />
                                <p>${user.displayName}</p>
                                <a role="button" class="btn border manage-account">Manage your account</a>
                            </li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-regular fa-newspaper me-2"></i>Your Blegs
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-bookmark me-2"></i> Saved Blegs
                                </a>
                            </li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-gear me-2"></i> Settings
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#" id="signout-btn">
                                    <i class="fa-solid fa-right-from-bracket me-2"></i> Sign Out
                                </a>
                            </li>
                        </ul>
                    </li>
    
    `
        const signOutBtn = document.getElementById('signout-btn');
        signOutBtn.addEventListener('click', signOutUser)
    } else {
        navbarItem.innerHTML += `<a role="button" href="./pages/signin.html" class="white-text me-2 primary-bg border-0 signin-btn">Sign In</a>`
    }
});

function signOutUser() {
    signOut(auth).then(() => {
        window.location.reload();
    }).catch((error) => {
        // An error happened.
    });
}