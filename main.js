const app = require('./app');
const config = require('./server/config/index');
const login = require('./server/routes/login');
const registration = require('./server/routes/registration');
const users = require('./server/routes/users');
const posts = require('./server/routes/posts');

const followers = require('./server/routes/followers');

app.use('/login', login);
app.use('/registration', registration);
app.use('/users', users);
app.use('/posts', posts);
app.use('/followers', followers);

app.listen(config.port, function () {
    console.log('Example app listening on port 3000!');
});
