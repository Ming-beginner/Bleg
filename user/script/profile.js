import { db, getDoc, updateDoc, doc, collection } from '../../script/modules/config.js';
import { blogCard } from '../../script/modules/components.js';

const userNameNode = document.querySelector('.user-name');
const userAvatarNode = document.querySelector('.user-avatar');
const blogCounter = document.querySelector('#blog-counter');
const likeCounter = document.querySelector('#like-counter');
const blogBlock = document.querySelector('#blog-block');
const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');
const noblogText = '<p class="display-6 fw-light text-secondary mt-5">No blog!</p>';

async function renderInfo() {
    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        let blog = userDoc.data().blog || 0;
        let like = userDoc.data().like || 0;
        let name = userDoc.data().name;
        let avatar = userDoc.data().avatar;
        let ownBlogList = userDoc.data().ownBlogList;



        userNameNode.innerText = name;
        userAvatarNode.src = avatar;
        blogCounter.innerText = blog;
        likeCounter.innerText = like;
        if (ownBlogList) {
            ownBlogList.forEach(async blogId => {
                let blogRef = doc(db, 'blogs', blogId);
                console.log(blogRef);
                let blogDoc = await getDoc(blogRef);
                if (blogDoc.exists()) {
                    blogBlock.innerHTML += blogCard(blogDoc.data());
                }
            })
        } else {
            blogBlock.innerHTML = noblogText;
        }
        await updateDoc(userRef, {
            blog,
            like,
        })
    }
}

renderInfo()