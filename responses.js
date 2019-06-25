
class Responses {

    // Static Methods.
    // Utility functions.
    static Status () {
        return {
            "Status-code": 200,
            "Content-Type": "application/json"
        }
    }

    // Set:
    // Defaul options, an empty Object.
    static SendResponse (res, data, options = {}) {
        // Overwrite:
        // Save a new object status.
        options = Object.assign(Responses.Status(), options);

        console.log("Options:", options);
        console.log("Options-Status-Code:", options["Status-code"]);
        // Get:
        // Data and parse it to a String.
        const response = JSON.stringify(data);
        console.log("Response:", response);

        // Use:
        // WriteHead(statusCode,[StatusMessage]) sends response to Header.
        res.writeHead(options["Status-code"], options);
        res.end(response);
    } 

    // Use:
    // Status code 400, Bad Request server cannot process request.
    static BadRequest (res, error = new Error('Bad request')) {
        Responses.SendResponse(res, error, {"Status-Code": 400});
    }

    // Use:
    // Status code 500, Internal Server Error.
    static InternalError (res, error = new Error('Application error')) {
        Responses.SendResponse(res, error, {"Status-Code": 500});
    }
}

module.exports = Responses;