let app = require('./app');
let config = require('./server/config/index');
let routes = require('./server/routes/index');

app.use('/', routes);

app.listen(config.port, function () {
    console.log('Example app listening on port 3000!');
});
