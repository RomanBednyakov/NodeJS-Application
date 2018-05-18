const searchInput = document.getElementById('search');
let friendsArr = {};
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
                friendsArr = [];
                usersArr = [];
                response.friends.forEach((item) => {
                    friendsArr.push(item)
                });
                response.users.forEach((item) => {
                    friendsArr.forEach((friend) => {
                        if (String(friend.following) === String(item.id)) {
                            item.followingId = friend.following;
                        }
                    });
                    usersArr.push(item);
                });
                render.renderFriends(usersArr, friendsArr);
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
        } else {
            e.target.className = 'buttonRemoveFriends';
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
            .then((response) => {
                console.log('##',response);
            })
            .catch((error) => {
                console.log('error',error);
            });
    }
});