const brandsJson = require('./brands.json');
const carsJson = require('./cars.json');

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

function dataTemplate(name, id , description = "This brand has no description.") {
    return {
        "name": name,
        "id": id,
        "description": description
    }
}

function getAllBrands (req, res, get) {
    Responses.SendResponse(res, brandsJson);
}

function getAllCars (req, res, get) {
    Responses.SendResponse(res, carsJson);
}

function getBrandById(req, res, get) {
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

                const queryTemplate = dataTemplate(dataQuery.query.name, indexData , dataQuery.query.description);
                dataObject.brandData.push(queryTemplate);

                // Use:
                // Parse data to an String.
                const backToJson = JSON.stringify(dataObject);
                console.log("BackTo", backToJson);

                function promisedData(data) {
                    return new Promise((resolve, reject) => {
                        fs.writeFile('./brands.json', data, 'utf8', (err) => {
                            err ? reject("Something went wrong: ", err) : resolve(data);
                        });
                    });
                }
                
                promisedData(backToJson).then((promisedData) => {Responses.SendResponse(res, promisedData)}).catch((err) => Responses.SendResponse(res, err));
            }
        })
    };
}

// function promiseData(data) {
//     const promiseResponse = new Promise((resolve, reject) => {
//         fs.writeFile('./brands.json', data, 'utf8', (err) => {
//             if (err) {
//                 console.log(err);
//             } resolve(data);
//         });
//     });
//     promiseResponse.then((promisedData) => {Responses.SendResponse(res, promisedData)}).catch((err) => Responses.SendResponse(res, err));
// };
// promiseData(backToJson);

module.exports = {
    getAllBrands,
    getBrandById,
    postBrand,

    getAllCars,
    getCarById
}