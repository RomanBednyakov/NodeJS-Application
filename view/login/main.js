window.onload = function() {
    let name = document.getElementById('name');
    let password = document.getElementById('password');
    let submit = document.getElementById('submit');
    let errorDiv = document.getElementById('error');

    submit.addEventListener('click', () => {
        let loginData = {
            name: name.value,
            password: password.value,
        };

        const url = new URL('http://localhost:3000/auth');
        url.search = new URLSearchParams(loginData);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    errorDiv.textContent = '';
                    return response.json();
                } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error
                }
            })
            .then((response) => {
                if (response.message === 'ok') {
                    localStorage.setItem('token', response.token);
                    document.location.replace('/');
                }else {
                    throw response.message
                }
            })
            .catch((error) => {
                console.error('error',error);
                errorDiv.textContent = error;
            });
    });
};