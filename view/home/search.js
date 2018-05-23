const searchInput = document.getElementById('search');
let usersArr = [];
searchInput.addEventListener('input', function () {
    render.renderRemovePost(false, true);
    if ( searchInput.value !== '') {
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: searchInput.value,
                token
            }),
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
                if (response.users) {
                    usersArr = [];
                    response.users.forEach((item) => {
                        usersArr.push(item);
                    });
                    render.renderFriends(response.users);
                } else {
                    render.renderMessagePost(response.message)
                }
            })
            .catch((error) => {
                console.log('error',error);
            });
    } else {
        render.renderRemovePost(false, true);
    }
});
posts.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.attributes[0].value === 'buttonRemoveFriends') {
            e.target.className = 'buttonFriends';
            e.target.textContent = 'Add to friend';
        } else {
            e.target.className = 'buttonRemoveFriends';
            e.target.textContent = 'Remove friend';
        }
        let name = e.target.parentElement.childNodes[0].textContent;
        let followingId = '';
        usersArr.forEach((item) => {
            if (item.name === name) {
                followingId = item.id
            }
        });
        fetch('/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                followingId,
                token
            }),
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
            .catch((error) => {
                console.log('error',error);
            });
    }
});