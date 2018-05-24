const myPosts = document.getElementById('myPosts');
const posts = document.getElementById('posts');
const addNewPost = document.getElementById('addNewPost');
const contentAddPost = document.getElementById('contentAddPost');
const titlePost = document.getElementById('titlePost');
const contentPost = document.getElementById('contentPost');
const addMyPost = document.getElementById('addMyPost');
const messageAddNewPost = document.getElementById('messageAddNewPost');
const myPostSection = document.getElementsByClassName('myPostSection');
const buttonPostFriends = document.getElementById('friendsPost');

// Add Posts
function newDate() {
    let myDate = new Date();
    myDate.setDate(myDate.getDate() + 20);
    return ('0' + myDate.getDate()).slice(-2) + '.' + ('0' + (myDate.getMonth()+1)).slice(-2) + '.' + myDate.getFullYear();
}

addNewPost.addEventListener('click', () => {
    contentAddPost.classList.add('activePostAdd');
    render.renderRemovePost(true);
});

addMyPost.addEventListener('click', () => {
    api.postAddNewPost('/posts/addPost',titlePost.value, contentPost.value, newDate());
});

// My Posts
myPosts.addEventListener('click', () => {
    render.renderRemovePost();
    api.getPosts('/posts/myPost')
});

//Friends Posts
buttonPostFriends.addEventListener('click', () => {
    render.renderRemovePost();
    api.getPosts('/posts/friendsPost');
});
