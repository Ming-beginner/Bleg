import { storage, tagList } from '../../script/modules/config.js';
const params = new URLSearchParams(window.location.search);

const title = document.getElementById('blog-title');
const blogSetting = document.getElementById('blog-setting');
const blogOptions = document.getElementById('blog-options');
const categoryContainer = document.getElementById('category-container');
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
blogSetting.addEventListener('click', () => {
    blogOptions.classList.toggle('blog-options-active');
})