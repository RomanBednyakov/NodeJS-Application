const app = require('./app');
const config = require('./server/config/index');
const login = require('./server/routes/login');
const registration = require('./server/routes/registration');
const home = require('./server/routes/home');
const posts = require('./server/routes/posts');
const search = require('./server/routes/search');
const friends = require('./server/routes/friends');

app.use('/login', login);
app.use('/registration', registration);
app.use('/home', home);
app.use('/posts', posts);
app.use('/search', search);
app.use('/friends', friends);

app.listen(config.port, function () {
    console.log('Example app listening on port 3000!');
});
