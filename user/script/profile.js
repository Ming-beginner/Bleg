import { auth, onAuthStateChanged, db } from '../../script/modules/config.js';


const userNameNode = document.querySelector('.user-name');
const userAvatarNode = document.querySelector('.user-avatar');

onAuthStateChanged(auth, (user) => {
    if (user) {
        userNameNode.innerText = user.displayName;
        userAvatarNode.src = user.photoURL;
    }
})