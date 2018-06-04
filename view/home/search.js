const searchInput = document.getElementById('search');
let usersArr = [];
let searchFriends = api.debounce(api.getUsers, 10);

searchInput.addEventListener('input', function () {
    render.renderRemovePost(false, true);
    if ( searchInput.value !== '') {
        setTimeout( function() { searchFriends() }, 10);
    } else {
        render.renderRemovePost(false, true);
    }
});

posts.addEventListener('click', (e) => {
    let name = e.target.parentElement.childNodes[0].textContent;
    let followingId = '';
    usersArr.forEach((item) => {
        if (item.name === name) {
            followingId = item.id
        }
    });
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.attributes[0].value === 'buttonRemoveFriends') {
            api.postFollowers('/followers','DELETE', followingId);
            e.target.className = 'buttonFriends';
            e.target.textContent = 'Add to friend';
        } else {
            api.postFollowers('/followers','POST', followingId);
            e.target.className = 'buttonRemoveFriends';
            e.target.textContent = 'Remove friend';
        }
    }
});