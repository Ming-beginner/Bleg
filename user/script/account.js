import {
    onAuthStateChanged,
    auth,
    getDoc,
    db,
    doc,
    updateProfile,
    updateEmail,
    setDoc,
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    Timestamp,
    signInWithEmailAndPassword,
    updatePassword,
    updateDoc,
    deleteDoc
} from '../../script/modules/config.js';
import validate from '../../script/modules/validate.js';

import { blogCard } from '../../script/modules/components.js';

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
const userDateOfBirthNode = document.querySelector(
    '.currentuser-date-of-birth'
);
const userEmailNode = document.querySelector('.currentuser-email');
const userNameInput = document.querySelector('#name-input');
const userGenderInput = document.querySelector('#gender-input');
const userDateOfBirthInput = document.querySelector('#date-input');
const userEmailInput = document.querySelector('#email-input');
const userAvatarInput = document.querySelector('#avatar-input');
const avatarPreview = document.querySelector('#avatar-preview');
const fileInput = document.querySelector('#file-input');
const updateInfoBtn = document.querySelector('#update-info-btn');

//Variables for modifying password

const oldPasswordInput = document.querySelector('#old-password-input');
const newPasswordInput = document.querySelector('#new-password-input');
const confirmNewPasswordInput = document.querySelector(
    '#confirm-new-password-input'
);
const textNode = document.querySelectorAll('.text-node');
const modifyPasswordBtn = document.querySelector('#modify-password-btn');



//

//Paginations
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('type');
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
        changeTab(index);

        if (index == 2) {
            let unsaveList = document.querySelectorAll('.unsave-btn');
            console.log(unsaveList);
            unsaveList.forEach((unsaveBtn) => {
                unsaveBtn.onclick = () => {
                    let blogId = unsaveBtn.id.split('-')[2];
                    console.log(blogId);
                    onAuthStateChanged(auth, async user => {
                        if (user) {
                            const userRef = doc(db, 'users', user.uid);
                            const userDoc = await getDoc(userRef);
                            if (userDoc.exists()) {
                                let savedBlogList = userDoc.data().savedBlogList;
                                let index = savedBlogList.indexOf(blogId);
                                savedBlogList.splice(index, 1);
                                console.log(savedBlogList);
                                await updateDoc(userRef, {
                                        savedBlogList,
                                    })
                                    .then(() => {
                                        showPopup('Success', 'This blog has been removed from your list!', '/user/account.html?type=yourbleqs', 'Continue')
                                    })
                            }
                        }
                    })
                }
            })
        } else if (index == 1) {
            let deleteBlogBtnList = document.querySelectorAll('.delete-blog-btn');
            deleteBlogBtnList.forEach(deleteBlogBtn => {
                deleteBlogBtn.onclick = () => {
                    let blogId = deleteBlogBtn.id.split('-')[3];
                    console.log(blogId);
                    onAuthStateChanged(auth, async user => {
                        if (user) {
                            const userRef = doc(db, 'users', user.uid);
                            const userDoc = await getDoc(userRef);
                            if (userDoc.exists()) {
                                let ownBlogList = userDoc.data().ownBlogList;
                                let blogCount = userDoc.data().blogCount;
                                let index = ownBlogList.indexOf(blogId);
                                blogCount--;
                                ownBlogList.splice(index, 1);
                                console.log(ownBlogList);
                                await updateDoc(userRef, {
                                    ownBlogList,
                                    blogCount
                                })
                                await deleteDoc(doc(db, 'blogs', blogId))
                                    .then(() => {
                                        showPopup('Success', 'This blog has been deleted!', '/user/account.html?type=savedbleqs', 'Continue')
                                    })
                            }
                        }
                    })
                }
            })
        }
    };
});
toYourBleqsTab.onclick = () => {
    changeTab(1);
};

toSavedBleqsTab.onclick = () => {
    changeTab(2);
};

toYourInfoTab.onclick = () => {
    changeTab(3);
};

toPasswordtab.onclick = () => {
    changeTab(4);
};

function changeTab(index) {
    for (let i = 0; i < tabNavigatorList.length; i++) {
        if (i != index) {
            tabList[i].classList.remove('d-flex');
            tabNavigatorList[i].classList.remove('tab-active');
        }
    }
    tabNavigatorList[index].classList.add('tab-active');
    tabList[index].classList.add('d-flex');
    hideSideBar();
}

sideBarIcon.onclick = () => {
    sideBar.classList.toggle('side-bar-active');
    sideBarIcon.classList.toggle('side-bar-icon-active');
    sideBarIcon.querySelector('i').classList.toggle('fa-times');
};

function hideSideBar() {
    sideBar.classList.remove('side-bar-active');
    sideBarIcon.classList.remove('side-bar-icon-active');
    sideBarIcon.querySelector('i').classList.remove('fa-times');
}

//Show Blogs

const savedBlogBlock = document.querySelector('#saved-blog-block');
const ownBlogBlock = document.querySelector('#own-blog-list');
const noblogText = '<p class="display-6 fw-light text-secondary mt-5">No blog!</p>';

onAuthStateChanged(auth, async user => {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        const savedBlogList = userDoc.data().savedBlogList || [];
        const ownBlogList = userDoc.data().ownBlogList || [];
        if (savedBlogList.length > 0) {
            savedBlogList.forEach(async(savedBlogId) => {
                let blogRef = doc(db, 'blogs', savedBlogId);
                let blogDoc = await getDoc(blogRef);
                if (blogDoc.exists()) {
                    savedBlogBlock.innerHTML += blogCard({
                        ...blogDoc.data(),
                        id: savedBlogId,
                    }, true);
                }
            })
        } else {
            savedBlogBlock.innerHTML = noblogText;
        }
        if (ownBlogList.length > 0) {
            ownBlogList.forEach(async(ownBlogId) => {
                let blogRef = doc(db, 'blogs', ownBlogId);
                let blogDoc = await getDoc(blogRef);
                if (blogDoc.exists()) {
                    ownBlogBlock.innerHTML += blogCard({
                        ...blogDoc.data(),
                        id: ownBlogId,
                    }, false, true);
                }
            })
        } else {
            ownBlogBlock.innerHTML = noblogText;
        }
    }
})



//Modify user info
const modifyUserInfoForm = document.querySelector('.overlay');
const modifyUserInfoBtn = document.querySelector('#modidy-info-btn');
const closeUserInfoFormBtn = document.querySelector('.close-popup');

modifyUserInfoBtn.onclick = () => {
    modifyUserInfoForm.classList.add('overlay-active');
};
closeUserInfoFormBtn.onclick = () => {
    modifyUserInfoForm.classList.remove('overlay-active');
};

//Show current user Info
onAuthStateChanged(auth, async(user) => {
    if (user) {
        const userId = user.uid;
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const gender = docSnap.get('gender');
            const dateOfBirth = new Date(
                docSnap.get('dateOfBirth').toDate()
            ).toLocaleDateString('ja-JP');
            const date = dateOfBirth
                .split('/')
                .map((char) => {
                    if (char.length <= 1) char = `0${char}`;
                    return char;
                })
                .join('-');
            usernameNodes.forEach((usernameNode) => {
                usernameNode.innerText = user.displayName;
            });
            userAvatarNodes.forEach((userAvatarNode) => {
                userAvatarNode.src = user.photoURL;
            });
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
            console.log('No such document!');
        }
    }
});

//Update user info

function showPopup(header, content, url, linkText) {
    const overlay = document.querySelector('.overlay-2');
    const popupHeader = document.getElementById('popup-header');
    const popupContent = document.getElementById('popup-content');
    const popupLink = document.getElementById('popup-link');
    popupHeader.innerText = header;
    popupContent.innerText = content;
    popupLink.innerText = linkText;
    popupLink.href = url;
    overlay.classList.add('overlay-active');
}

fileInput.onchange = () => {
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
                    userAvatarInput.value = url;
                    avatarPreview.src = url;
                });
            });
        } else {
            window.location.href = '../index.html';
        }
    });
};

userAvatarInput.oninput = () => {
    avatarPreview.src = userAvatarInput.value;
};

updateInfoBtn.onclick = () => {
    let name = userNameInput.value;
    let email = userEmailInput.value;
    let gender = userGenderInput.value;
    let dateOfBirth = userDateOfBirthInput.value;
    let photoURL = avatarPreview.src || '/asset/img/avatar.png';
    updateUserInfo(name, photoURL, email, gender, dateOfBirth);
};

function updateUserInfo(name, photoURL, email, gender, dateOfBirth) {
    let dateArgs = dateOfBirth.split('-');
    console.log(dateArgs);
    let _dateOfBirth = new Date(
        parseInt(dateArgs[0]),
        parseInt(dateArgs[1]) - 1,
        parseInt(dateArgs[2])
    );
    console.log(_dateOfBirth);
    updateProfile(auth.currentUser, {
            displayName: name,
            photoURL,
        })
        .then(() => {
            console.log('Name and avatar updated');
        })
        .then(async() => {
            if (auth.currentUser) {
                let uid = auth.currentUser.uid;

                try {
                    await setDoc(doc(db, 'users', uid), {
                        dateOfBirth: Timestamp.fromDate(_dateOfBirth),
                        gender,
                    });
                    showPopup(
                        'Success',
                        'Successfully modified your info!',
                        './account.html',
                        'Continue'
                    );
                } catch (e) {
                    console.error('Error adding document: ', e);
                    showPopup('Error', e, './account.html', 'Continue');
                }
            }
        });
    updateEmail(auth.currentUser, email)
        .then(() => {
            console.log('Email updated');
        })
        .catch((error) => {
            console.log(error);
        });
}

//Modify password
let isCorrectOldPassword = false;
let isCorrectNewPassword = false;
let isCorrectConfirmPassword = false;
oldPasswordInput.onchange = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            signInWithEmailAndPassword(
                auth,
                user.email,
                oldPasswordInput.value
            ).then(() => {
                isCorrectOldPassword = validate({
                    type: 'password',
                    node: oldPasswordInput,
                    min: 8,
                    textNode: textNode[0],
                    success: '',
                });
            }).catch(() => {
                isCorrectOldPassword = validate({
                    type: 'email',
                    node: oldPasswordInput,
                    textNode: textNode[0],
                    error: 'Wrong password',
                })
            });
        }
    });
};

newPasswordInput.onchange = () => {
    isCorrectNewPassword = validate({
        type: 'password',
        node: newPasswordInput,
        min: 8,
        textNode: textNode[1],
        success: '',
    });
};

confirmNewPasswordInput.onchange = () => {
    console.log(newPasswordInput.value);
    let password = newPasswordInput.value;
    isCorrectConfirmPassword = validate({
        type: 'repeat-password',
        node: confirmNewPasswordInput,
        textNode: textNode[2],
        success: '',
        password,
    });
};

modifyPasswordBtn.onclick = () => {
    if (isCorrectOldPassword && isCorrectNewPassword && isCorrectConfirmPassword) {
        updatePassword(auth.currentUser, newPasswordInput.value)
            .then(() => {
                showPopup('Success', 'Your password has been updated!', './account.html', 'Continue');
            })
            .catch(() => {
                showPopup('Error', 'Error updating your password', './account.html', 'Continue');
            });
    }
}