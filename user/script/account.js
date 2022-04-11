import { onAuthStateChanged, auth, getDoc, db, doc, } from '../../script/modules/config.js';


//Varianles for handling navigating tabs
const tabNavigatorList = document.querySelectorAll('.tab-navigator');
const tabList = document.querySelectorAll('.tab-content-container>div');
const sideBar = document.querySelector('.side-bar');
const sideBarIcon = document.querySelector('.side-bar-icon');
const toYourBleqsTab = document.querySelector('.to-your-bleqs-tab');
const toSavedBleqsTab = document.querySelector('.to-saved-bleqs-tab');
const toYourInfoTab = document.querySelector('.to-your-info-tab');
const toPasswordtab = document.querySelector('.to-password-tab');

//Variables for showing and modifying user info

const usernameNodes = document.querySelectorAll('.username');
const userAvatarNodes = document.querySelectorAll('.currentuser-avatar');
const userGenderNode = document.querySelector('.currentuser-gender');
const userDateOfBirthNode = document.querySelector('.currentuser-date-of-birth');
const userEmailNode = document.querySelector('.currentuser-email');
const userNameInput = document.querySelector('#name-input');
const userGenderInput = document.querySelector('#gender-input');
const userDateOfBirthInput = document.querySelector('#date-input');
const userEmailInput = document.querySelector('#email-input');
const userAvatarInput = document.querySelector('#avatar-input');
const avatarPreview = document.querySelector('#avatar-preview');


//Paginations
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('type');
console.log(slug)
switch (slug) {
    case 'yourbleqs':
        changeTab(1);
        break;
    case 'savedbleqs':
        changeTab(2);
    default:

        break;
}


//Tab Navigating
tabNavigatorList.forEach((tabNavigator, index) => {
    tabNavigator.onclick = () => {
        changeTab(index)
    }
})
toYourBleqsTab.onclick = () => {
    changeTab(1);
}

toSavedBleqsTab.onclick = () => {
    changeTab(2);
}

toYourInfoTab.onclick = () => {
    changeTab(3);
}

toPasswordtab.onclick = () => {
    changeTab(4);
}

function changeTab(index) {
    for (let i = 0; i < tabNavigatorList.length; i++) {
        if (i != index) {
            tabList[i].classList.remove("d-flex");
            tabNavigatorList[i].classList.remove('tab-active');
        }
    }
    tabNavigatorList[index].classList.add("tab-active");
    tabList[index].classList.add('d-flex');
    hideSideBar();
}

sideBarIcon.onclick = () => {
    sideBar.classList.toggle('side-bar-active');
    sideBarIcon.classList.toggle('side-bar-icon-active');
    sideBarIcon.querySelector('i').classList.toggle('fa-times');
}

function hideSideBar() {
    sideBar.classList.remove('side-bar-active');
    sideBarIcon.classList.remove('side-bar-icon-active');
    sideBarIcon.querySelector('i').classList.remove('fa-times');
}

//Modify user info
const modifyUserInfoForm = document.querySelector('.overlay');
const modifyUserInfoBtn = document.querySelector('#modidy-info-btn');
const closeUserInfoFormBtn = document.querySelector('.close-popup');

modifyUserInfoBtn.onclick = () => {
    modifyUserInfoForm.classList.add('overlay-active');
}
closeUserInfoFormBtn.onclick = () => {
    modifyUserInfoForm.classList.remove('overlay-active');

}

//Show current user Info
onAuthStateChanged(auth, async(user) => {

    if (user) {
        const userId = user.uid;
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const gender = docSnap.get('gender');
            const dateOfBirth = new Date(docSnap.get('dateOfBirth').toDate()).toLocaleDateString('ja-JP');
            const date = dateOfBirth.split('/').map(char => {
                if (char.length <= 1) char = `0${char}`;
                return char
            }).join('-');
            usernameNodes.forEach((usernameNode) => {
                usernameNode.innerText = user.displayName;
            })
            userAvatarNodes.forEach(userAvatarNode => {
                userAvatarNode.src = user.photoURL;
            })
            userGenderNode.innerText = gender;
            userDateOfBirthNode.innerText = dateOfBirth;
            userEmailNode.innerText = user.email;



            userNameInput.value = user.displayName;
            userDateOfBirthInput.value = date;
            userEmailInput.value = user.email;
            userGenderInput.value = gender;
            userAvatarInput.value = user.photoURL;
            avatarPreview.src = user.photoURL;
        } else {
            console.log("No such document!");
        }
    }
})