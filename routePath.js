class RoutePath {
    constructor (path, index) {
        this.index = index;
        this.path = path;
        // Generates:
        // Boolean value depending on Parameters on path.
        // this.param = this.hasParam();
    }

    // Return:
    // Function returns true or false, if Path has Params.
    // hasParam() {
    //     Use:
    //     Validates by RegularExpresion using (:)
    //     let regexp = /\:\w/i;

    //     Use:
    //     The method .test search for a match.
    //     return regexp.test(this.path);
    // }
}

module.exports = RoutePath;