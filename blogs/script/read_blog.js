import { getDoc, doc, db, getDocs, updateDoc, onAuthStateChanged, auth, collection } from '../../script/modules/config.js';
import { tagCard, commentCard, landscapeBlogCard } from '../../script/modules/components.js';
import isSignedIn from '../../script/modules/config.js'
const heartBtns = document.querySelectorAll('.heart-btn');
const commentBtns = document.querySelectorAll('.comment-btn');
const saveBtn = document.querySelector('.save-btn');
const commentBlock = document.querySelector('#comment-block');
const commentsField = document.querySelector('.comments')
const overlay = document.querySelector('.overlay');
const tagsBlock = document.querySelector('.blog-tags');
const closeCommentBtns = document.querySelectorAll('.close-comment');

const moreBlogsBlock = document.querySelector('.more-blogs-block');

const popup = document.querySelector('.popup');


//Render Blog

const blogBlock = document.querySelector('#blog');
const likeCounters = document.querySelectorAll('.like-count');
const commentCounters = document.querySelectorAll('.comment-count');
const authorAvatar = document.querySelectorAll('.author-avatar');
const authorName = document.querySelectorAll('.author-name');
const createdDate = document.querySelector('.created-date');

let like = 0;
let comment = 0;

const params = new URLSearchParams(window.location.search);

let blogId = params.get('id');
if (!blogId) window.location.href = '/error.html'
let blogRef = doc(db, 'blogs', blogId);
let userRef;
let liked;
let saved;

window.onload = async() => {
    onAuthStateChanged(auth, async user => {
        if (user) {
            userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                liked = userDoc.data().likedBlogList.includes(blogId);
                saved = userDoc.data().savedBlogList.includes(blogId);
                console.log(userDoc.data().likedBlogList);
                if (liked) {
                    activeHeartBtn();
                }
                if (saved) {
                    activeSavedBtn();
                }
            }
        }
    });
    const querySnapshot = await getDocs(collection(db, 'blogs'));
    querySnapshot.forEach((doc) => {
        let blogInfo = {
            authorAvatar: doc.data().authorAvatar,
            authorId: doc.data().authorId,
            authorName: doc.data().authorName,
            blogTitle: doc.data().blogTitle,
            thumbnail: doc.data().thumbnail,
            tagList: doc.data().tagList,
            id: doc.id,
        }
        moreBlogsBlock.innerHTML += landscapeBlogCard(blogInfo);
    });
}


const docSnap = await getDoc(blogRef);
if (docSnap.exists()) {
    console.log(docSnap.data());
    like = docSnap.data().likeCount;
    comment = docSnap.data().commentCount || 0;
    let createdAt = docSnap.data().createdAt.toDate().toLocaleDateString('jp-JP');
    blogBlock.innerHTML = docSnap.data().blogContent;
    createdDate.innerText = createdAt;

    authorAvatar.forEach(node => {
        node.src = docSnap.data().authorAvatar;
    })
    authorName.forEach(node => {
        node.innerText = docSnap.data().authorName;
    })
    likeCounters.forEach((likeCounter) => {
        likeCounter.innerText = like;
    });
    updateCommentCount();

    docSnap.data().tagList.forEach((tag) => {
        tagsBlock.innerHTML += tagCard(tag);
    })

    docSnap.data().commentList.forEach((comment) => {
        commentsField.innerHTML += commentCard(comment);
    })
} else {
    window.location.href = '/error.html'
}


//Handle button click
heartBtns.forEach((heartBtn) => {
    heartBtn.onclick = async() => {
        heartBtn.classList.toggle('fas');
        heartBtn.classList.toggle('heart-active');
        if (isSignedIn(showPopup)) {
            onAuthStateChanged(auth, async user => {
                if (user) {
                    userRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists()) {
                        let likedBlogList = userDoc.data().likedBlogList;
                        if (heartBtn.classList.contains('heart-active')) {
                            like++;
                            likedBlogList.push(blogId);
                        } else {
                            like--;
                            let index = userDoc.data().likedBlogList.indexOf(blogId);
                            likedBlogList.splice(index, 1);
                        }
                        console.log(likedBlogList, like);
                        likeCounters.forEach((likeCounter) => {
                            likeCounter.innerText = like;
                        });
                        await updateDoc(userRef, {
                            likedBlogList,
                        })
                        await updateDoc(blogRef, {
                            likeCount: like,
                        })
                    }
                }
            })

        }
    }

})
saveBtn.onclick = () => {
    if (isSignedIn(showPopup)) {
        saveBtn.classList.toggle('fas');
        saveBtn.classList.toggle('save-active');
        onAuthStateChanged(auth, async user => {
            userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            console.log(userDoc.exists());
            if (userDoc.exists()) {
                console.log(userDoc.data());
                const savedBlogList = userDoc.data().likedBlogList || [];
                if (saveBtn.classList.contains('save-active')) {
                    savedBlogList.push(blogId);
                } else {
                    let index = savedBlogList.indexOf(blogId);
                    savedBlogList.splice(index, 1);
                }
                console.log(savedBlogList);
                await updateDoc(userRef, {
                    savedBlogList: savedBlogList,
                })
            }
        })
    }
}
commentBtns.forEach((commentBtn) => {
    commentBtn.onclick = () => {
        if (isSignedIn(showPopup)) {
            overlay.classList.add('overlay-active');
            commentBlock.classList.add('comment-block-active');
        }
    }
})
closeCommentBtns.forEach(closeCommentBtn => {
    closeCommentBtn.onclick = removeCommentBlock;
})


function activeHeartBtn() {
    heartBtns.forEach((heartBtn) => {
        heartBtn.classList.add('fas');
        heartBtn.classList.add('heart-active');
    })
}

function inactiveHeartBtn() {
    heartBtns.forEach((heartBtn) => {
        heartBtn.classList.remove('fas');
        heartBtn.classList.remove('heart-active');
    })
}

function activeSavedBtn() {
    saveBtn.classList.add('fas');
    saveBtn.classList.add('save-active');
}

function removeCommentBlock(e) {
    console.log(e.target);
    overlay.classList.remove('overlay-active');
    commentBlock.classList.remove('comment-block-active');
}

//Comment

const commentInput = document.querySelector('#comment-input');
const uploadCommentBtn = document.querySelector('#upload-comment-btn');
uploadCommentBtn.onclick = () => {
    if (commentInput.value) {
        uploadComment(commentInput.value);
        commentInput.value = '';
    }
}

function uploadComment(commentContent) {
    onAuthStateChanged(auth, async user => {
        if (user) {
            let newComment = {
                commentContent,
                authorId: user.uid,
                authorAvatar: user.photoURL,
                authorName: user.displayName,
            }
            comment++;
            const docSnap = await getDoc(blogRef);
            if (docSnap.exists()) {
                console.log(docSnap.data());
                let commentList = [...docSnap.data().commentList];
                commentList.push(newComment);
                await updateDoc(blogRef, {
                    commentList,
                    commentCount: comment,
                })
                updateCommentCount();
            } else {
                console.log('no ref');
            }
            commentsField.innerHTML += commentCard(newComment);
        }
    })
}

function updateCommentCount() {
    commentCounters.forEach((commentCounter) => {
        commentCounter.innerText = comment;
    });
}

function showPopup() {
    popup.classList.add('popup-active');
    overlay.classList.add('overlay-active');
}