import { onAuthStateChanged, auth, setDoc, db, doc, Timestamp, collection, addDoc, getDoc, updateDoc } from '../../script/modules/config.js'

const queryParams = new URLSearchParams(window.location.search);
const type = queryParams.get('type');
let id;

$('#tag-writing').selectpicker();
$('#summernote').summernote({
    height: 500,
    toolbar: [
        // [groupName, [list of button]]
        ['style', ['style']],
        ['font', ['bold', 'underline', 'strikethrough', 'italic']],
        ['fontname', ['fontname', 'fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'video']],
    ]
});
$('#title-input').on('input', () => {
    document.title = $('#title-input').val();
})
onAuthStateChanged(auth, async user => {
    if (user) {
        if (type == 'modify') {
            id = queryParams.get('id');
            const blogRef = doc(db, 'blogs', id);
            const blogDoc = await getDoc(blogRef);
            if (blogDoc.exists()) {
                let tagList = blogDoc.data().tagList.map((tag) => tag.tagName);
                console.log(tagList);
                $('.note-editable').html(blogDoc.data().blogContent);
                $('#title-input').val(blogDoc.data().blogTitle);
                $('#tag-writing').val(tagList);
                console.log($('#tag-writing').val());
            }
        }

        $('#export-btn').click(async() => {
            let tagList;
            if ($('#tag-writing').val().length > 0) {

                tagList = $('#tag-writing').val().map(tag => {
                    return { tagName: tag, tagURL: `/blogs/index.html?type=${convertTagName(tag)}` }
                });
            } else {
                tagList = [{ tagName: 'Other', tagURL: `/blogs/index.html?type=Other` }]
            }
            let thumbnail = $('.note-editable img:first-of-type').attr('src') || '/asset/img/banner.png';
            const blogInfo = {
                blogContent: $('.note-editable').html(),
                blogTitle: $('#title-input').val(),
                tagList,
                authorName: user.displayName,
                authorId: user.uid,
                authorAvatar: user.photoURL,
                commentCount: 0,
                commentList: [],
                likeCount: 0,
                createdAt: Timestamp.now(),
                thumbnail,
            }
            console.log(tagList);
            let blogRef;
            if (type == 'write-blog') {
                blogRef = await addDoc(collection(db, 'blogs'), blogInfo);
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);
                let ownBlogList;
                let blogCount;
                if (userDoc.exists()) {
                    ownBlogList = userDoc.data().ownBlogList || [];
                    blogCount = userDoc.data().blogCount || 0;
                    ownBlogList.push(blogRef.id);
                    blogCount++;
                }
                await updateDoc(userRef, {
                        ownBlogList,
                        blogCount
                    })
                    .then(() => {
                        $('.overlay').addClass('overlay-active');
                    })
            } else if (type == 'modify') {
                updateDoc(doc(db, 'blogs', id), blogInfo)
                    .then(() => {
                        $('.overlay').addClass('overlay-active');
                    })
            }


        })


    } else {
        window.location.href = '/auth/signin.html'
    }
})

function convertTagName(tag) {
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