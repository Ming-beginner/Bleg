import { storage, tagList, getDoc, setDoc, doc, db, collection, Timestamp } from '../../script/modules/config.js';
import { tagCard, commentCard } from '../../script/modules/components.js';
const heartBtns = document.querySelectorAll('.heart-btn');
const commentBtns = document.querySelectorAll('.comment-btn');
const saveBtn = document.querySelector('.save-btn');
const commentBlock = document.querySelector('#comment-block');
const commentsField = document.querySelector('.comments')
const overlay = document.querySelector('.overlay');
const tagsBlock = document.querySelector('.blog-tags');
const closeCommentBtns = document.querySelectorAll('.close-comment');




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
console.log(blogRef);


const docSnap = await getDoc(blogRef);
if (docSnap.exists()) {
    console.log(docSnap.data());
    like = docSnap.data().likeCount;
    comment = docSnap.data().commentCount;
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

    commentCounters.forEach((commentCounter) => {
        commentCounter.innerText = comment;
    });

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
        heartBtns.forEach((heartBtn) => {
            activeHeartBtn(heartBtn);
        })
        if (heartBtn.classList.contains('heart-active')) {
            like++;
        } else {
            like--;
        }
        likeCounters.forEach((likeCounter) => {
            likeCounter.innerText = like;
        });
    }

})
saveBtn.onclick = () => {
    saveBtn.classList.toggle('fas');
    saveBtn.classList.toggle('save-active');
}
commentBtns.forEach((commentBtn) => {
    commentBtn.onclick = () => {
        overlay.classList.add('overlay-active');
        commentBlock.classList.add('comment-block-active');
    }
})
console.log(closeCommentBtns);
closeCommentBtns.forEach(closeCommentBtn => {
    closeCommentBtn.onclick = removeCommentBlock;
})


function activeHeartBtn(heartBtn) {
    heartBtn.classList.toggle('fas');
    heartBtn.classList.toggle('heart-active');
}

function removeCommentBlock(e) {
    console.log(e.target);
    overlay.classList.remove('overlay-active');
    commentBlock.classList.remove('comment-block-active');
}