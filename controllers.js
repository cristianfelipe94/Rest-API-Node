const data = require('./data.json');

function getAllBrands (req, res, get) {
    console.log("You will get: ",get, "End getting");
    return data.brandData;
}

function getBrandById(req, res, get) {
    console.log("You will get: ",get.matched[1].path, "End getting");
    const dataId = get.matched[1].path;
    return data.brandData[dataId];
}

function getAllCars (req, res, get) {
    console.log("You will get: ",get, "End getting");
    return data.carsData;
}

function getCarById(req, res, get) {
    console.log("You will get: ",get, "End getting");
    return data.carsData[1];
}

module.exports = {
    getAllBrands,
    getBrandById,

    getAllCars,
    getCarById
}