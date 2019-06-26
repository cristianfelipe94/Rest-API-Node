const data = require('./data.json');
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

function getAllBrands (req, res, get) {
    return data.brandData;
}

function getBrandById(req, res, get) {
    const dataId = +get.matched[3].path;
    const findData = data.brandData.find(element => element.id === dataId);
    if (findData) {
        // console.log("To be sent: ", findData);
        return Responses.SendResponse(res, findData);
    } else {
        const errObject = errorHandler(400, 'Bad Request', dataId, `Brand Id: ${dataId} not found, please use a Value from 1 to ${data.brandData.length}`);
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`Brand Id: ${dataId} not found, please use a Value from 1 to ${data.brandData.length}`));
    };
}

function getAllCars (req, res, get) {
    console.log("You will get: ",get, "End getting");
    return data.carsData;
}

function getCarById(req, res, get) {
    const dataId = +get.matched[3].path;
    const findData = data.carsData.find(element => element.id === dataId);
    if (findData) {
        // console.log("To be sent: ", findData);
        return Responses.SendResponse(res, findData);
    } else {
        const errObject = errorHandler(400, 'Bad Request', dataId, `Brand Id: ${dataId} not found, please use a Value from 1 to ${data.carsData.length}`);
        Responses.SendResponse(res, errObject);
        Responses.BadRequest(res, new Error(`Brand Id: ${dataId} not found, please use a Value from 1 to ${data.carsData.length}`));
    };
}

// fs.readFile('./data.json', 'utf8', (err, data) => {
//     if(err) {
//         console.log(err);
//     } else {
//         const stringObject = JSON.parse(data);
//         stringObject.brandId+=1;
//         const backToJson = JSON.stringify(stringObject);
//         fs.writeFile('./data.json', backToJson, 'utf8', (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         })
//     }
// })

function postBrand(req, res, get) {

    const data = get;
    console.log(data);
    // const dataIndex = data.bandId += 1;
    // fs.writeFile('data.bandId', dataIndex, (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Wrote file.");
    //     }
    // })
    // console.log(get);
    // const processedRequest = () => {
    //     if (!get) {
    //         const errObject = errorHandler(400, 'Bad Request', get, `New data is NOT correct, please make sure you are filling all the requested information.`);
    //         Responses.SendResponse(res, errObject);
    //         Responses.BadRequest(res, new Error(`New data is NOT correct, please make sure you are filling all the requested information.`));
    //     } else if (!get.name) {
    //         const errObject = errorHandler(400, 'Bad Request', get.name, `New data is NOT correct, please submit a name for this brand.`);
    //         Responses.SendResponse(res, errObject);
    //         Responses.BadRequest(res, new Error(`New data is NOT correct, please submit a name for this brand.`));
    //     } else if (get) {
    //         console.log(get);
    //     }
    // }
}

module.exports = {
    getAllBrands,
    getBrandById,
    postBrand,

    getAllCars,
    getCarById
}