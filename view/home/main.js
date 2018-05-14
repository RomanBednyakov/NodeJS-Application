window.onload = function() {
    let token = localStorage.getItem('token');
    let userDiv = document.getElementById('user');
    let search = document.getElementById('search');

    function loggedUser() {
        fetch('/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            // body: JSON.stringify({
            //     token: token,
            // })
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
                let fragment = document.createDocumentFragment();
                let userObj = response.user;
                for( let i in userObj) {
                    if (i !== 'password' && i !== 'id') {
                        let elem = document.createElement('h3');
                        let elemText = document.createTextNode(String(userObj[i]));
                        elem.appendChild(elemText);
                        fragment.appendChild(elem);
                    }
                }
                userDiv.appendChild(fragment);
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
};