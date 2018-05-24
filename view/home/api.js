const token = localStorage.getItem('token');
function Api() {}

Api.prototype = {
    getRequestLogin : function (url) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
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
                userDiv.appendChild(document.createTextNode(String(response.user.name)));
            })
            .catch(() => document.location.replace('/login'));
    },
    getPosts: function (url) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
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
                render.renderPost(response.posts)
            })
            .catch((error) => {
                console.log('error',error);
            });
    },
    getUsers : function () {
        fetch('/users/search', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'text': searchInput.value
            },
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
    },
    postAddNewPost: function (url, title, content, date) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                date,
                token
            }),
        })
            .then((response) => {
                console.log('##',111);
                titlePost.value = '';
                contentPost.value = '';
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else if (response.status === 500) {
                    document.location.replace('/login')
                }
                else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error
                }
            })
            .then((response) => render.renderMessagePost(String(response.message)))
            .catch((error) => render.renderMessagePost(String(error)));
    },
    postFollowers : function (url ,followingId) {
        fetch(url, {
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
    },
    debounce: function (f, ms) {
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
    },
};
let api = new Api();