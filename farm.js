//functions based on original tests

// const getYieldForPlant = (object) => {
//     console.log(object.yield);
//     return object.yield;
// }

const getYieldForPlant = (object) => object.yield;

const getYieldForCrop = (object) => object.crop.yield * object.numCrops;

// const getTotalYield = (object) => {
//     let result = 0
//     object.crops.forEach((crops) => {
//     result += crops.crop.yield * crops.numCrops
//     })
//     return result;
// }

const getTotalYield = (object) => {
    let result = 0
    object.crops.forEach((crops) => {
    result += getYieldForCrop(crops)
    })
    return result;
}

//Modified initial functions for new functionalities
const getCostsForCrop = (object) => object.cost * object.numCrops;

const getRevenueForCrop = (object) => object.salesPrice * object.crop.yield * object.numCrops;

//const getProfitForCrop = (object) => ((object.salesPrice * object.crop.yield) - object.cost) * object.numCrops;
const getProfitForCrop = (object) => getRevenueForCrop(object) - getCostsForCrop(object);

// const getTotalProfit = (object) => {
//     let result = 0
//     object.crops.forEach((crops) => {
//     result += ((crops.salesPrice * crops.crop.yield) - crops.cost) * crops.numCrops;
//     })
//     return result;
// }

const getTotalProfit = (object) => {
    let result = 0
    object.crops.forEach((crops) => {
    result += getProfitForCrop(crops);
    })
    return result;
}

//Modified initial functions to include environmental factors

const getYieldForPlantWith = (object, factor) => 
    object.yield * ((100 + object.factor.sun[factor.sun])/ 100);

const getYieldForPlantWithMore = (object, factor) => 
    object.yield * ((100 + object.factor.sun[factor.sun])/ 100) * 
    ((100 + object.factor.wind[factor.wind])/ 100);

const getYieldForCropWithMore = (object, factor) => {
    let result = 0

    if ('sun' in object.crop.factor === true && 'wind' in object.crop.factor === true) 
    {   
        result = object.crop.yield * ((100 + object.crop.factor.sun[factor.sun])/ 100) * 
        ((100 + object.crop.factor.wind[factor.wind])/ 100) * object.numCrops;
        return (result);

    } else if ('sun' in object.crop.factor === true && 'wind' in object.crop.factor !== true) 
    {
        result = object.crop.yield * ((100 + object.crop.factor.sun[factor.sun])/ 100) * 
        object.numCrops;
        return (result);

    } else if ('sun' in object.crop.factor !== true && 'wind' in object.crop.factor === true) 
    {
        result = object.crop.yield * ((100 + object.crop.factor.wind[factor.wind])/ 100) * 
        object.numCrops;
        return (result);

    } else if ('sun' in object.crop.factor !== true && 'wind' in object.crop.factor !== true) 
    {
        result = object.crop.yield * object.numCrops;
        return (result);

    } else return result; 
}

const getTotalYieldWithMore = (object, factor) => {
    let result = 0
    object.crops.forEach((crops) => {
    result += getYieldForCropWithMore(crops, factor)
    })
    return result;
}

//Modified initial functions for new functionalities including environment

const getRevenueForCropWithMore = (object, factor) => object.salesPrice * getYieldForCropWithMore(object, factor);

const getProfitForCropWithMore = (object, factor) => getRevenueForCropWithMore(object, factor) - getCostsForCrop(object);

const getTotalProfitWithMore = (object, factor) => {
    let result = 0
    object.crops.forEach((crops) => {
    result += getProfitForCropWithMore(crops, factor);
    })
    return result;
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
    getYieldForPlantWith,
    getYieldForPlantWithMore,
    getYieldForCropWithMore,
    getTotalYieldWithMore,
    getRevenueForCropWithMore,
    getProfitForCropWithMore,
    getTotalProfitWithMore,
};

