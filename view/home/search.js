const searchInput = document.getElementById('search');
let usersArr = [];

function debounce(f, ms) {

    let timer = null;

    return function (...args) {
        const onComplete = () => {
            f.apply(this, args);
            timer = null;
        };

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(onComplete, ms);
    };
}

function searchRequest() {
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
            } else if (response.status === 500) {
                document.location.replace('/login')
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
}

let searchFriends = debounce(searchRequest, 10);

searchInput.addEventListener('input', function () {
    render.renderRemovePost(false, true);
    if ( searchInput.value !== '') {
        setTimeout( function() { searchFriends() }, 10);
    } else {
        render.renderRemovePost(false, true);
    }
    // if (document.location.pathname !== '/search/') {
    //     history.pushState({search: 'search'},'' ,'search');
    // }
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
                } else if (response.status === 500) {
                    document.location.replace('/login')
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