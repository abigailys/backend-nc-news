function createLookupObject(dataArray, lookupKey, lookupValue) {
    const lookupObject = {};
    
    for (let i = 0; i < dataArray.length; i++) {
        lookupObject[dataArray[i][lookupKey]] = dataArray[i][lookupValue]
    }
    return lookupObject;
}

module.exports = { createLookupObject }