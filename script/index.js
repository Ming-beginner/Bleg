import { tagList, getDocs, db, collection } from '../../script/modules/config.js';
import { blogCard } from '../../script/modules/components.js';
const params = new URLSearchParams(window.location.search);

const blogCardBlock = document.getElementById('blog-card-block');
const blogRef = collection(db, 'blogs');


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