const userDiv = document.getElementById('user');

function loggedUser() {
    api.getRequestLogin('/users/auth')
}
if (token !== null) {
    loggedUser();
} else {
    document.location.replace('/login');
}

// locations();
// const event = new Event('click');
// function locations() {
//     console.log('history',history);
//     if (document.location.pathname === '/addPost/') {
//         addNewPost.dispatchEvent(event);
//         // history.pushState({addPost: 'addPost'},'' ,'');
//     } else if (document.location.pathname === '/friendsPost/') {
//         // history.pushState({friendsPost: 'friendsPost'},'' ,'');
//         buttonPostFriends.dispatchEvent(event);
//     } else if (document.location.pathname === '/search/') {
//         // history.pushState({search: 'search'},'' ,'');
//         searchInput.dispatchEvent(event);
//     } else if (document.location.pathname === '/myPost/') {
//         // history.pushState({myPost: 'myPost'},'' ,'');
//         myPosts.dispatchEvent(event);
//     }
// }