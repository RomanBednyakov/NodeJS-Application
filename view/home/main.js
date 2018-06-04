const userDiv = document.getElementById('user');

function loggedUser() {
    api.getRequestLogin('/users/auth')
}
if (token !== null) {
    loggedUser();
} else {
    document.location.replace('/login');
}