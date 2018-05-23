let buttonPostFriends = document.getElementById('friendsPost');
buttonPostFriends.addEventListener('click', () => {
    render.renderRemovePost();
    fetch('/posts/friendsPost', {
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
            console.log('##',response);
            render.renderPost(response.posts)
        })
        .catch((error) => {
            console.log('error',error);
        });
});