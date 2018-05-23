const token = localStorage.getItem('token');
const userDiv = document.getElementById('user');

const event = new Event('click');

// function locations() {
//     if (document.location.pathname === '/addPost/') {
//         addNewPost.dispatchEvent(event);
//     } else if (document.location.pathname === '/friendsPost/') {
//         buttonPostFriends.dispatchEvent(event);
//     } else if (document.location.pathname === '/search/') {
//         searchInput.dispatchEvent(event);
//     } else if (document.location.pathname === '/myPost/') {
//         myPosts.dispatchEvent(event);
//     }
// }
//
// locations();
function loggedUser() {
    fetch('/home', {
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
            let userObj = response.user;
            for( let i in userObj) {
                if (i === 'name') {
                    userDiv.appendChild(document.createTextNode(String(userObj[i])));
                }
            }
        })
        .catch((error) => {
            console.log('error',error);
            document.location.replace('/login');
        });
}
if (token !== null) {
    loggedUser();
} else {
    document.location.replace('/login');
}
