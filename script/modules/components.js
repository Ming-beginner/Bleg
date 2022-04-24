export function blogCard(blogInfo, haveSaveOption = false, haveMoreOption = false) {
    return `
    <div class="card blog-card mb-3">
        <a href="/blogs/read_blog.html?id=${blogInfo.id}" class="card-img-top">
        
        <div style="display: block;height: 124px; background: url(${blogInfo.thumbnail}) top center / cover no-repeat" alt="image" /></div>
        </a> 
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
                ${haveSaveOption ? `<i class="fas fa-trash cspt fs-4 unsave-btn" id="blog-id-${blogInfo.id}"></i>` : ''}
                ${haveMoreOption ? 
                    `<i class="fas fa-ellipsis-v cspt" onclick="this.parentNode.parentNode.parentNode.querySelector('.more-option').classList.toggle('more-option-active')"></i>`: ''}
            </div>
            ${haveMoreOption ? 
                `<div class="more-option">
                    <a class="no-decor text-black" href="/text_editor/index.html?type=modify&id=${blogInfo.id}">
                        <i class="fas fa-pen"></i> Modify
                    </a>
                    <a class="delete-blog-btn no-decor text-black" id="delete-blog-id-${blogInfo.id}">
                        <i class="fas fa-trash"></i> Delete
                    </a>
                </div>` : ''}
        </div>
    </div>
    `
}



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
            <a href="/blogs/index.html?id=${blogInfo.id}" class="col-md-4">
                <div style="background: url(${blogInfo.thumbnail}) top center / cover no-repeat" class="img-fluid rounded-start h-100" alt="..."></div>
            </a>
            <div class="col-md-8 ">
                <div class="card-body pt-2 d-flex justify-content-between">
                    <h5 class="card-title fs-4">${blogInfo.blogTitle}</h5>
                </div>
                <div class="author-info ms-2 d-flex justify-content-between pe-2 ps-2">
                    <a href="/user/profile.html?id=${blogInfo.authorId}" class="mb-1 no-decor text-black">
                        <img src="${blogInfo.authorAvatar}" class="avatar" style="width: 40px; height: 40px" alt=" " /> 
                        <span class="author-name">${blogInfo.authorName}</span>
                    </a>
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