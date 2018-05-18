function Render() {}

Render.prototype = {
    renderMessagePost: function (content) {
        messageAddNewPost.textContent = content;
        // messageAddNewPost.appendChild(document.createTextNode(content));
    },
    renderRemovePost: function (flagRemove, flagSearch) {
        if(!flagRemove) {
            contentAddPost.classList.remove('activePostAdd');
        }
        if (!flagSearch) {
            searchInput.value = '';
        }
        if(myPostSection.length > 0) {
            posts.removeChild(myPostSection[0]);
        }
        this.renderMessagePost('');
    },
    renderFriends: function (users) {
        let fragment = document.createDocumentFragment();
        let AllUser = document.createElement('section');
        AllUser.className = 'myPostSection';
        users.forEach((item)=> {
            let elemButton = document.createElement('button');
            let infoPost = document.createElement('div');
            if (item.followingId) {
                elemButton.className = 'buttonRemoveFriends';
                elemButton.appendChild(document.createTextNode('Remove friend'));
            } else  {
                elemButton.className = 'buttonFriends';
                elemButton.appendChild(document.createTextNode('Add to friend'));
            }
            infoPost.className = 'divFriends';

            let elemTextName = document.createTextNode(String(item.name));

            infoPost.appendChild(elemTextName);
            infoPost.appendChild(elemButton);

            fragment.appendChild(infoPost);
        });
        AllUser.appendChild(fragment);
        posts.appendChild(AllUser);
    },
    renderPost : function (post) {
        let fragment = document.createDocumentFragment();
        let AllMyPost = document.createElement('section');
        AllMyPost.className = 'myPostSection';
        if (isNaN(post)) {
            post.forEach((item)=> {
                let elemTitle = document.createElement('span');
                let elemDate = document.createElement('span');
                let elemName = document.createElement('h5');
                let elemContent = document.createElement('p');
                let elemMyPost = document.createElement('div');
                let infoPost = document.createElement('aside');

                let elemTextTitle = document.createTextNode(String(item.title));
                let elemTextDate = document.createTextNode(String(item.data));
                let elemTextName = document.createTextNode(String(item.name));
                let elemTextContent = document.createTextNode(String(item.content));

                elemTitle.appendChild(elemTextTitle);
                elemName.appendChild(elemTextName);
                elemDate.appendChild(elemTextDate);
                elemContent.appendChild(elemTextContent);

                infoPost.appendChild(elemTitle);
                infoPost.appendChild(elemName);
                infoPost.appendChild(elemDate);
                elemMyPost.appendChild(infoPost);
                elemMyPost.appendChild(elemContent);

                fragment.appendChild(elemMyPost);
            });
            AllMyPost.appendChild(fragment);
            posts.appendChild(AllMyPost);

        } else {
            // let postMessage = document.createElement('span');
            // postMessage.appendChild(document.createTextNode('There is no post'));
            this.renderMessagePost('There is no post')
        }
    }
};
let render = new Render();