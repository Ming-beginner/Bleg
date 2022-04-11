import {
    auth,
    onAuthStateChanged,
    signOut,
    app
} from './modules/config.js';


const navbarItem = document.getElementById('navbar-items');
let currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        navbarItem.innerHTML += `
    <li class="nav-item dropdown" >
                        <a class="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="${user.photoURL}" class="avatar" width="45px" alt="" />
                        </a>
                        <ul class="dropdown-menu" id="dropdown" aria-labelledby="navbarDropdown">
                            <li class="d-flex align-items-center  flex-column">
                                <img src=${user.photoURL} class="avatar" alt="" />
                                <p>${user.displayName}</p>
                                <a role="button" href="/user/settings.html" class="btn border manage-account">Manage your account</a>
                            </li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li>
                                <a class="dropdown-item" href="/user/profile.html">
                                <i class="fas fa-address-card me-2"></i>Profile
                                </a>
                            </li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li>
                                <a class="dropdown-item" href="/user/account.html?type=yourbleqs">
                                    <i class="fa-regular fa-newspaper me-2"></i>Your Blegs
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="/user/account.html?type=savedbleqs">
                                    <i class="fa-solid fa-bookmark me-2"></i> Saved Blegs
                                </a>
                            </li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li>
                                <a class="dropdown-item" href="#" id="signout-btn">
                                    <i class="fa-solid fa-right-from-bracket me-2"></i> Sign Out
                                </a>
                            </li>
                        </ul>
                    </li>
    
    `;
        const signOutBtn = document.getElementById('signout-btn');
        signOutBtn.addEventListener('click', signOutUser);
    } else {
        navbarItem.innerHTML += `<a role="button" href="./auth/signin.html" class="white-text me-2 primary-bg border-0 signin-btn">Sign In</a>`;
    }
});

function signOutUser() {
    signOut(auth)
        .then(() => {
            window.location.href = '/index.html';
        })
        .catch((error) => {
            // An error happened.
        });
}