import { storage, tagList, getDoc, getDocs, doc, db, collection } from '../../script/modules/config.js';
import { blogCard } from '../../script/modules/components.js';
const params = new URLSearchParams(window.location.search);

const title = document.getElementById('blog-title');
const categoryContainer = document.getElementById('category-container');
const blogCardBlock = document.getElementById('blog-card-block');
const blogRef = collection(db, 'blogs');

console.log(blogRef);


//Render category tags
for (let tag of tagList) {
    categoryContainer.innerHTML += `
    <a role="button" href="index.html?type=${tag}" class="primary-bg category text-white">
    ${tag}
</a>
    `
}

if (params.has('type')) {
    title.innerText = params.get('type');
} else {
    title.innerText = 'New Blogs'
}

//Render blog cards


const querySnapshot = await getDocs(blogRef);
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.data());
    let blogInfo = {
        authorAvatar: doc.data().authorAvatar,
        authorId: doc.data().authorId,
        authorName: doc.data().authorName,
        blogTitle: doc.data().blogTitle,
        thumbnail: doc.data().thumbnail,
        tagList: doc.data().tagList,
        id: doc.id,
    }
    console.log(blogInfo);
    blogCardBlock.innerHTML += blogCard(blogInfo)
});