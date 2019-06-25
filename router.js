
const Responses = require('./responses.js');
const Route = require('./route.js');

// Class using a Singletone.
let instance = null;
class Router {
    constructor(routes) {
        // Get:
        // Routes from Class Constructor.
        this.routes = routes.map(currentRoute => new Route(currentRoute));
        // Return:
        // An Array of Objects with (.method) and (.path).
        // Test:
        // console.log("Route path: ", this.routes[0].path, "Route method: ", this.routes[0].method);
        // Return:
        // An array of Objects with (.controller) and (.pathStatus).
        // Test:
        // console.log("Route controller: ", this.routes[1].controller, "Route pathStatus: ", this.routes[1].pathStatus);
    }

    route (req, res) {
        this.req = req;
        this.res = res;

        // Request:
        // This request event, includes a URL path.
        let path = this.req.url;
        // console.log("Path route:",path)
        
        // Request:
        // This request event, includes a Method GET or POST.
        let method = this.req.method;
        // console.log("Path method:",method)

        // Pass:
        // Check information that comes from Request and compare it with what it's stored in Instance.
        let matched = this.routes.find((currentRoute) => {
            // Use:
            // Compare every route with request Route.
            let responseRoute = currentRoute.check(path, method);
            // Get:
            // Response is an Array or String.
            // Return:
            // Array.
            if (responseRoute.length) {
                if(responseRoute[0] === true) {
                    return currentRoute;
                }
            } else {
                // Return:
                // String.
                if (responseRoute === true) {
                    return currentRoute;
                }
            };
        });
        
        // Check if the response from the Matched path is False.
        // Throw error.
        if(!matched) {
            return Responses.BadRequest(new Error(`Bad Request: ${method} ${path}`));
        } else if (matched) {
            // Returns:
            // Pass matched route and create an Instance from it.
            let matchedRoute = matched.routeGenerator(req, res, path);

            // Get:
            // Create data by passing Request and Response from Route to controller.
            let data = matchedRoute.controller(this.req, this.res, matchedRoute)
            Responses.SendResponse(res, data);
        }
    }

    static Register(routes) {
        // Checks if Instance from SingleTone class is already created.
        // If not, passes Routes to class.
        if(!instance) instance = new Router(routes);
        return instance.route.bind(instance);
        // Return:
        // Passes created SingleTone to function "instance.route".
        // Instance.route returns class function.
        // Instance returns Array of Routes with Path, Methods...
    }
}

module.exports = Router;