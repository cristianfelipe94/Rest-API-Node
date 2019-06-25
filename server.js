const http = require('http');

const Router = require('./router.js');
const controllers = require('./controllers.js')

// process.env.PORT: This is an environment variable.
// If this variable is not set it up, the default will be '8000'.
// Variable comes from Node environment.
const port = process.env.PORT || 8000;

const routes = [
    { method: 'GET', path: '/brands', controller: controllers.getAllBrands },
    { method: 'GET', path: '/brands/:id', controller: controllers.getBrandById},

    { method: 'GET', path: '/cars', controller: controllers.getAllCars },
    { method: 'GET', path: '/cars/:id', controller: controllers.getCarById}
];

const server = http.createServer(Router.Register(routes));
server.listen(port);