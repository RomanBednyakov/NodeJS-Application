const myPosts = document.getElementById('myPosts');
const posts = document.getElementById('posts');


myPosts.addEventListener('click', () => {
    render.renderRemovePost();
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
            render.renderPost(response.posts)
        })
        .catch((error) => {
            console.log('error',error);
        });
});