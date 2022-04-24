import { tagList, getDocs, db, collection, query, where } from '../../script/modules/config.js';
import { blogCard } from '../../script/modules/components.js';
const params = new URLSearchParams(window.location.search);

const title = document.getElementById('blog-title');
const categoryContainer = document.getElementById('category-container');
const blogCardBlock = document.getElementById('blog-card-block');
const blogRef = collection(db, 'blogs');

let tag;


//Render category tags
for (let tag of tagList) {
    categoryContainer.innerHTML += `
    <a role="button" href="index.html?type=${tag}" class="primary-bg category text-white">
    ${tag}
</a>
    `
}
tag = params.get('type')
title.innerText = tag;



if (params.has('type')) {
    console.log(tag, shorthandTagName(tag));
    const q = query(blogRef, where("tagList", "array-contains", { tagName: shorthandTagName(tag), tagURL: `/blogs/index.html?type=${tag}` }));
    tag = params.get('type');
    const querySnapshot = await getDocs(q)
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
        console.log(blogInfo);
        blogCardBlock.innerHTML += blogCard(blogInfo)
    });

} else {
    const querySnapshot = await getDocs(blogRef);
    title.innerText = 'New Blogs';
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
        console.log(blogInfo);
        blogCardBlock.innerHTML += blogCard(blogInfo)
    });
}

function fullTagName(tag) {
    switch (tag) {
        case 'Web':
            return 'Web Development';
        case 'Mobile':
            return 'Mobile Development';
        case 'DS':
            return 'Data Science';
        case 'AI':
            return 'Artificial Intelligent';
        case 'BC':
            return 'Block Chain';
        case 'Life':
            return 'Life Style';
        default:
            return tag;
    }
}

function shorthandTagName(tag) {
    switch (tag) {
        case 'Web Development':
            return 'Web';
        case 'Mobile Development':
            return 'Mobile';
        case 'Data Science':
            return 'DS';
        case 'Artificial Intelligent':
            return 'AI';
        case 'Block Chain':
            return 'BC';
        case 'Life Style':
            return 'Life';
        default:
            return tag;
    }
}
//Render blog cards