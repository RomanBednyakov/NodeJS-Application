const addNewPost = document.getElementById('addNewPost');
const contentAddPost = document.getElementById('contentAddPost');
const titlePost = document.getElementById('titlePost');
const contentPost = document.getElementById('contentPost');
const addMyPost = document.getElementById('addMyPost');
const messageAddNewPost = document.getElementById('messageAddNewPost');
const myPostSection = document.getElementsByClassName('myPostSection');

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
    fetch('/posts/addPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: titlePost.value,
            content: contentPost.value,
            data: newDate(),
            token
        }),
    })
        .then((response) => {
            titlePost.value = '';
            contentPost.value = '';
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error
            }
        })
        .then((response) => render.renderMessagePost(String(response.message)))
        .catch((error) => render.renderMessagePost(String(error)));

});
