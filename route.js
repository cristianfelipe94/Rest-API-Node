
const RoutePath = require('./routePath.js');

class Route {
    constructor(singleRoute) {
        this.path = singleRoute.path;
        this.method = singleRoute.method;
        this.matched = singleRoute.matched ? this.getPathStatus(singleRoute.matched) : [];

        this.controller = singleRoute.controller;

        this.pathStatus = this.getPathStatus();
    }

    // Use:
    // This funtion will create route instances.
    routeGenerator(req, res, path) {
        return new Route ({
            path: this.path,
            method: this.method,
            matched: path,
            controller: this.controller,
        })
    }

    // Get: Path and Generate and object with Status options.
    // Default: Use the singlePath tha comes from Constructor.
    getPathStatus(path = this.path) {
        // Get: String.
        // Use: String.Split(value): Separate string by value. 
        // Use: ManyValues.Filter(singleValue => apply something to current Value).
        const generatedStatus = path.split('/')
            .filter(currentValue => currentValue)
            .map((currentPath, indexPath) => new RoutePath(currentPath, indexPath));
        return generatedStatus;
    }

    check(path, method) {
        // Check:
        // This path comes from Request, must be Splited.
        let paths = this.getPathStatus(path);
        // Return:
        // Array with objects.
        let matched = false;

        // First check if Request-Method is different from Class-Method.
        if (method !== this.method) {
            return matched = false;
          // Secondly check if Request-Path is equal to Class-Path.
        } else if(path === this.path) {
            return matched = true;
          // Third check if Request-Path-Status is equal to Class-Path-Status.
        } else if (paths.length === this.pathStatus.length) {
            // Fourth map throw an array an compare Class-Path (current) to Request-Path (path[index]).
            matched = this.pathStatus.map((current, index) => {
                if (current.path === paths[index].path) {
                    // console.log("Current path: ", current.path, ">>>>", "Compare to: ", paths[index].path);
                    return matched = true;
                } else return false;
            });
        } else return false;
            // console.log("Matched status: ", matched);
            return matched;
    }
}

module.exports = Route;