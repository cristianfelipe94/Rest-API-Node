const http = require('http');

const Router = require('./router.js');
const controllers = require('./controllers.js')

// process.env.PORT: This is an environment variable.
// If this variable is not set it up, the default will be '8000'.
// Variable comes from Node environment.
const port = process.env.PORT || 8000;

const routes = [
    { method: 'GET', path: 'api/v1/brands', controller: controllers.getAllBrands},
    { method: 'GET', path: 'api/v1/brands/:id', controller: controllers.getBrandById},

    { method: 'POST', path: 'api/v1/brands', controller: controllers.postBrand},

    { method: 'GET', path: 'api/v1/cars', controller: controllers.getAllCars},
    { method: 'GET', path: 'api/v1/cars/:id', controller: controllers.getCarById}
];

const serverFront = http.createServer(Router.Register(routes)).listen(port);

// const server = http.createServer(Router.Register(routes)).listen(port);
