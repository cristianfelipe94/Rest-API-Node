const data = require('./data.json');
const Responses = require('./responses.js');

function errorHandler(code, type, data, message) {
    return {
        "Error Code": code,
        "Error Type": type,
        "Request": data,
        "Error Message": message,
    }
}

function getAllBrands (req, res, get) {
    console.log("You will get: ",get, "End getting");
    return data.brandData;
}

function getBrandById(req, res, get) {
    const dataId = +get.matched[1].path;
    const findData = data.brandData.find(element => element.id === dataId);
    if (findData) {
        // console.log("To be sent: ", findData);
        return Responses.SendResponse(res, findData);
    } else {
        const errObject = errorHandler(400, 'Bad Request', dataId, `Brand Id: ${dataId} not found, please use a Value from 1 to ${data.brandData.length}`)
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`Brand Id: ${dataId} not found, please use a Value from 1 to ${data.brandData.length}`))
    };
}



function getAllCars (req, res, get) {
    console.log("You will get: ",get, "End getting");
    return data.carsData;
}

function getCarById(req, res, get) {
    const dataId = +get.matched[1].path;
    const findData = data.carsData.find(element => element.id === dataId);
    if (findData) {
        // console.log("To be sent: ", findData);
        return Responses.SendResponse(res, findData);
    } else {
        const errObject = errorHandler(400, 'Bad Request', dataId, `Brand Id: ${dataId} not found, please use a Value from 1 to ${data.carsData.length}`)
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`Brand Id: ${dataId} not found, please use a Value from 1 to ${data.carsData.length}`))
    };
}

module.exports = {
    getAllBrands,
    getBrandById,

    getAllCars,
    getCarById
}