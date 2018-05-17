const app = require('./app');
const config = require('./server/config/index');
const login = require('./server/routes/login');
const registration = require('./server/routes/registration');
const home = require('./server/routes/home');
const posts = require('./server/routes/posts');

app.use('/login', login);
app.use('/registration', registration);
app.use('/home', home);
app.use('/posts', posts);

app.listen(config.port, function () {
    console.log('Example app listening on port 3000!');
});
