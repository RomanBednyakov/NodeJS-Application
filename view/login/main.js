window.onload = function() {
    let name = document.getElementById('name');
    let password = document.getElementById('password');
    let submit = document.getElementById('submit');
    let errorDiv = document.getElementById('error');

    function saveTokenToLocalStorage (response) {
        localStorage.setItem('token', response);
    }

    submit.addEventListener('click', () => {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.value,
                password: password.value,
            }),
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    errorDiv.innerText = '';
                    return response.json();
                } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error
                }
            })
            .then((response) => {
                saveTokenToLocalStorage(response.token);
                document.location.replace('/');
            })
            .catch((error) => {
                console.log('error',error);
                errorDiv.innerText = 'Username or password was entered incorrectly';
            });
    });
};