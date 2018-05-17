const myPosts = document.getElementById('myPosts');
const myPostMessage = document.getElementById('myPostMessage');


myPosts.addEventListener('click', () => {
    contentAddPost.classList.remove('activePostAdd');
    fetch('/posts/myPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
    })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error
            }
        })
        .then((response) => {
            let posts = response.posts;
            let fragment = document.createDocumentFragment();
            let AllMyPost = document.createElement('section');
            while (myPostMessage.firstChild) {
                myPostMessage.removeChild(myPostMessage.firstChild);
            }
            // console.log('##',myPostMessage.removeChild(myPostMessage.firstChild));
            if (isNaN(posts)) {
                posts.forEach((item)=> {
                    let elemTitle = document.createElement('span');
                    let elemDate = document.createElement('span');
                    let elemName = document.createElement('h5');
                    let elemContent = document.createElement('p');
                    let elemMyPost = document.createElement('div');
                    let infoPost = document.createElement('aside');

                    let elemTextTitle = document.createTextNode(String(item.title));
                    let elemTextDate = document.createTextNode(String(item.data));
                    let elemTextName = document.createTextNode(String(item.username));
                    let elemTextContent = document.createTextNode(String(item.content));

                    elemTitle.appendChild(elemTextTitle);
                    elemName.appendChild(elemTextName);
                    elemDate.appendChild(elemTextDate);
                    elemContent.appendChild(elemTextContent);

                    infoPost.appendChild(elemTitle);
                    infoPost.appendChild(elemName);
                    infoPost.appendChild(elemDate);
                    elemMyPost.appendChild(infoPost);
                    elemMyPost.appendChild(elemContent);

                    fragment.appendChild(elemMyPost);
                });
                AllMyPost.appendChild(fragment);
                myPostMessage.appendChild(AllMyPost);

            } else {
                let postMessage = document.createElement('span');
                postMessage.appendChild(document.createTextNode('There is no post'));
                myPostMessage.appendChild(postMessage);
            }
        })
        .catch((error) => {
            console.log('error',error);
        });
});