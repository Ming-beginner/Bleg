import {
    auth,
    onAuthStateChanged
} from './modules/config.js';

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = '/auth/signin.html';
    }
})