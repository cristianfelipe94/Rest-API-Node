const Responses = require('./responses.js');
const fs = require('fs');

function errorHandler(code, type, data, message) {
    return {
        "Error Code": code,
        "Error Type": type,
        "Request": data,
        "Error Message": message,
    }
}

function dataTemplateBrands(name, id , description = "This brand has no description.") {
    return {
        "name": name,
        "id": id,
        "description": description
    }
}

function dataTemplateCars(name, color, year, description = "This car has no description.", date, id) {
    return {
        "name": name,
        "color": color,
        "year": year,
        "description": description,
        "date": date,
        "id": id,
    }
}

function getAllBrands (req, res, get) {
    const brandsJson = require('./brands.json');
    Responses.SendResponse(res, brandsJson);
}

function getAllCars (req, res, get) {
    const carsJson = require('./cars.json');
    Responses.SendResponse(res, carsJson);
}

function getBrandById(req, res, get) {
    const brandsJson = require('./brands.json');
    const dataId = +get.matched[3].path;
    const findData = brandsJson.brandData.find(element => element.id === dataId);
    if (findData) {
        // console.log("To be sent: ", findData);
        return Responses.SendResponse(res, findData);
    } else {
        const errObject = errorHandler(400, 'Bad Request', dataId, `Brand Id: ${dataId} not found, please use a Value from 1 to ${brandsJson.brandData.length}`);
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`Brand Id: ${dataId} not found, please use a Value from 1 to ${brandsJson.brandData.length}`));
    };
}

function getCarById(req, res, get) {
    const carsJson = require('./cars.json');
    const dataId = +get.matched[3].path;
    const findData = carsJson.carsData.find(element => element.id === dataId);
    if (findData) {
        console.log("To be sent: ", findData);
        return Responses.SendResponse(res, findData);
    } else {
        const errObject = errorHandler(400, 'Bad Request', dataId, `Brand Id: ${dataId} not found, please use a Value from 1 to ${carsJson.carsData.length}`);
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`Brand Id: ${dataId} not found, please use a Value from 1 to ${carsJson.carsData.length}`));
    };
}

function checkKeys (keysArray) {
    const expectedKeys = ['name', 'description'];
    const response = [];
    for (let i = 0; i < keysArray.length; i++) {
        const outsideKey = keysArray[i];
        const insideKey = expectedKeys[i];
        const responseMatched = outsideKey.localeCompare(insideKey);
        response.push(responseMatched);
    }
    if (response[0] === response[1]) {
        return true;
    } else {
        return false;
    }
}

function postBrand(req, res, get) {
    const brandsJson = require('./brands.json');
    const dataQuery = get;
    const keyObject = Object.keys(dataQuery.query);
    const keysChecker = checkKeys(keyObject);
    if (!dataQuery) {
        const errObject = errorHandler(400, 'Bad Request', dataQuery, `New data is NOT correct, please make sure you are filling all the requested information.`);
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`New data is NOT correct, please make sure you are filling all the requested information.`));
    } else if (!dataQuery.query) {
        const errObject = errorHandler(400, 'Bad Request', dataQuery.query, `New data is NOT correct, please submit a new data query.`);
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`New data is NOT correct, please submit a name for this brand.`));
    } else if (!keysChecker) {
        const errObject = errorHandler(400, 'Bad Request', dataQuery.query, `New data is NOT correct, please use the Keys: "name" or "description" , to submit new information.`);
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`New data is NOT correct, please use the Keys: "name" or "description" , to submit new information.`));
    } else if (dataQuery.query) {
        
        fs.readFile('./brands.json', 'utf8', (err, data) => {
            if(err) {
                console.log("Not able to read data: ",err);
            } else {
                // Use:
                // Parse data to an Object.
                const dataObject = JSON.parse(data);
                const indexData = dataObject.brandId+=1;

                const queryTemplate = dataTemplateBrands(dataQuery.query.name, indexData , dataQuery.query.description);
                dataObject.brandData.push(queryTemplate);

                // Use:
                // Parse data to an String.
                const backToJson = JSON.stringify(dataObject);
                console.log("BackTo", backToJson);

                function promisedData(data) {
                    return new Promise((resolve, reject) => {
                        fs.writeFile('./brands.json', data, 'utf8', (err) => {
                            !err ? resolve(data) : reject("Something went wrong: ", err);
                        });
                    });
                }
                promisedData(backToJson).then((promisedData) => {Responses.SendResponse(res, promisedData)}).catch((err) => Responses.SendResponse(res, err));
            }
        })
    };
}

function postCar(req, res, get) {
    const carsJson = require('./cars.json');
    const dataQuery = get;
    const keyObject = Object.keys(dataQuery.query);
    const keysChecker = checkKeys(keyObject);
    if (!dataQuery) {
        const errObject = errorHandler(400, 'Bad Request', dataQuery, `New data is NOT correct, please make sure you are filling all the requested information.`);
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`New data is NOT correct, please make sure you are filling all the requested information.`));
    } else if (!dataQuery.query) {
        const errObject = errorHandler(400, 'Bad Request', dataQuery.query, `New data is NOT correct, please submit a new data query.`);
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`New data is NOT correct, please submit a name for this brand.`));
    } else if (!keysChecker) {
        const errObject = errorHandler(400, 'Bad Request', dataQuery.query, `New data is NOT correct, please use the Keys: "name" or "description" , to submit new information.`);
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`New data is NOT correct, please use the Keys: "name" or "description" , to submit new information.`));
    } else if (dataQuery.query) {
        
        fs.readFile('./cars.json', 'utf8', (err, data) => {
            if(err) {
                console.log("Not able to read data: ",err);
            } else {
                // Use:
                // Parse data to an Object.
                const dataObject = JSON.parse(data);
                const indexData = dataObject.carId+=1;

                const queryTemplate = dataTemplateCars(
                    dataQuery.query.name,
                    dataQuery.query.color,
                    dataQuery.query.year,
                    dataQuery.query.description,
                    dataQuery.query.date, indexData
                );
                dataObject.carsData.push(queryTemplate);

                // Use:
                // Parse data to an String.
                const backToJson = JSON.stringify(dataObject);
                console.log("BackTo", backToJson);

                function promisedData(data) {
                    return new Promise((resolve, reject) => {
                        fs.writeFile('./cars.json', data, 'utf8', (err) => {
                            !err ? resolve(data) : reject("Something went wrong: ", err);
                        });
                    });
                }
                promisedData(backToJson).then((promisedData) => {Responses.SendResponse(res, promisedData)}).catch((err) => Responses.SendResponse(res, err));
            }
        })
    };
}

function deleteCarById(req, res, get) {
    const carsJson = require('./cars.json');
    const dataId = +get.matched[3].path;
    const findData = carsJson.carsData.find(element => element.id === dataId);
    if (findData) {

        // var arrDeletedItems = array.splice(start[, deleteCount[, item1[, item2[, ...]]]]);
        const indexToBeSpliced = carsJson.carsData.indexOf(findData);
        const splicedElement = carsJson.carsData.splice(indexToBeSpliced, 1);
        // console.log("data to be spliced: ", splicedElement);

        // Use:
        // Parse data to an String.
        const backToJson = JSON.stringify(carsJson);

        function promisedData(data) {
            return new Promise((resolve, reject) => {
                fs.writeFile('./cars.json', data, 'utf8', (err) => {
                    !err ? resolve(data) : reject("Something went wrong: ", err);
                });
            });
        }
        return promisedData(backToJson).then((promisedData) => {Responses.SendResponse(res, promisedData)}).catch((err) => Responses.SendResponse(res, err));
    } else {
        const errObject = errorHandler(400, 'Bad Request', dataId, `Brand Id: ${dataId} not found, please use a Value from 1 to ${carsJson.carsData.length}`);
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`Brand Id: ${dataId} not found, please use a Value from 1 to ${carsJson.carsData.length}`));
    };
}

module.exports = {
    getAllBrands,
    getBrandById,

    postBrand,
    postCar,

    getAllCars,
    getCarById,

    deleteCarById,
}