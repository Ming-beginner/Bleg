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
            <a href="/blogs/read_blog.html?id=${blogInfo.id}" style="max-height: 30px; " class="no-decor d-block text-black card-title mb-5">
                <h4 class="text-truncate">${blogInfo.blogTitle}</h4>
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


export function commentCard(commentInfo) {

    return `
    <div class="comment mb-3">
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
    <div class="card mb-3" style="width: 700px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${blogInfo.thumbnail}" class="img-fluid rounded-start h-100" alt="...">
            </div>
            <div class="col-md-8 ">
                <div class="card-body pt-2 d-flex justify-content-between">
                    <h5 class="card-title fs-4">${blogInfo.blogTitle}</h5>
                </div>
                <div class="author-info ms-2 d-flex justify-content-between pe-2 ps-2">
                    <div class="mb-1">
                        <img src="${blogInfo.authorAvatar}" class="avatar" style="width: 40px; height: 40px" alt=" " /> 
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
    </div>

    `
}