const addNewPost = document.getElementById('addNewPost');
const contentAddPost = document.getElementById('contentAddPost');
const titlePost = document.getElementById('titlePost');
const contentPost = document.getElementById('contentPost');
const addMyPost = document.getElementById('addMyPost');
const messageRes = document.getElementById('messageRes');
const nameUser = document.getElementsByClassName('name');

function newDate() {
    let d = new Date();
    let curr_date = d.getDate();
    let curr_month = d.getMonth() + 1;
    let curr_year = d.getFullYear();
    return curr_year + "-" + curr_month + "-" + curr_date;
}

addNewPost.addEventListener('click', () => {
    contentAddPost.classList.add('activePostAdd');
    messageRes.innerText = '';
    while (myPostMessage.firstChild) {
        myPostMessage.removeChild(myPostMessage.firstChild);
    }
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
            nameUser: nameUser[0].textContent,
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
        .then((response) => {
            // messageRes.innerText = response.message;
            while (messageRes.firstChild) {
                messageRes.removeChild(messageRes.firstChild);
            }
            let messageAddPost = document.createElement('span');
            messageAddPost.appendChild(document.createTextNode(String(response.message)));
            messageRes.appendChild(messageAddPost);
        })
        .catch((error) => {
            console.log('error',error);
            // while (messageRes.firstChild) {
            //     messageRes.removeChild(messageRes.firstChild);
            // }
            // messageRes.innerText = error
            messageAddPost.appendChild(document.createTextNode(String(error)));
            messageRes.appendChild(messageAddPost);
        });

});
