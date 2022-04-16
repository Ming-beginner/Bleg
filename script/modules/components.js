export function blogCard(blogInfo, haveSaveOption = false, haveDeleteOption = false, haveModifyOption = false) {
    return `
    <div href="/blogs/read_blog.html?id=${blogInfo.id}" class="card blog-card mb-3">
        <a href="/blogs/read_blog.html?id=${blogInfo.id}"><img class="card-img-top" src="${blogInfo.thumbnail}" alt="image" /></a>
        <div class="card-body">
            <div class="w-100 tag-list mb-2">
                ${
                    blogInfo.tagList.map((tag)=>{
                        return `<a href="${tag.tagURL}" class="tag">${tag.tagName}</a>`
                    }).join(' ')
                }
            </div>
            <a href="/blogs/read_blog.html?id=${blogInfo.id}" class="no-decor text-black card-title mb-5">
                <h4>${blogInfo.blogTitle}</h4>
            </a>
            <div class="blog-info mt-3">
                <a href="/user/profile.html?id=${blogInfo.authorId}" class="author-info">
                    <img src="${blogInfo.authorAvatar}" width="40 " class="avatar" alt=" " />
                    <span class="author-name">${blogInfo.authorName}</span>
                </a>
            </div>
        </div>
    </div>
    `
}

export function questionCard(authorInfo) {}



function activeHeartBtn(heartBtn) {
    heartBtn.classList.toggle('fas');
    heartBtn.classList.toggle('heart-active');
}
export function commentCard(commentInfo) {
    let createdDate = commentInfo.createdAt.toDate().toLocaleDateString('jp-JP');

    return `
    <div class="comment">
        <div>
            <img src="${commentInfo.authorAvatar}" class="avatar me-3" alt="">
        </div>
        <div>
            <div class="main-comment">
                <div class="author">
                    <span class="author-name">${commentInfo.authorName}</span>
                </div>
                <div class="content">
                    <p>${commentInfo.commentContent}</p>
                </div>
            </div>
            <div class="feedback-comment d-flex">
                <div class="like-answers-block d-flex">
                    <div class="like me-3">
                        <i class="far fa-heart cspt heart-btn" onclick="this.classList.toggle('fas'); this.classList.toggle('heart-active')"></i>
                        <span>${commentInfo.likeCount}</span>
                    </div>
                    <div class="answer me-3">
                        <i class="far fa-comments cspt"></i>
                        <span>${commentInfo.answerCount}</span>
                    </div>
                </div>
                <div class="created-at">${createdDate}</div>
            </div>
        </div>

        <div class="answer-comment">

        </div>
    </div>
    
    
    `
}

export function tagCard(tagInfo) {
    return `<a href="${tagInfo.tagURL}" class="">${tagInfo.tagName}</a>`
}

export function landscapeBlogCard(blogInfo) {
    

    return `
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${blogInfo.thumbnail}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8 ">
            <div class="card-body pt-2 d-flex justify-content-between">
                <h4 class="card-title fs-4">${blogInfo.blogTitle}</h4>
            </div>
            <div class="author-info ms-2 d-flex justify-content-between pe-2 ps-2">
                <div>
                    <img src="${blogInfo.authorAvatar}" class="avatar" alt=" " /> 
                    <span class="author-name">${blogInfo.authorName}</span>
                </div>
                <div>
                    ${
                        blogInfo.tagList.map((tag)=>{
                            return `<a href="${tag.tagURL}" class="tag">${tag.tagName}</a>`
                        }).join(' ')
                    }
                </div>
            </div>
        </div>
    </div>

    `
}