const getAPI = async function(res, connectObj, tableName) {
    
    if (tableName == 'join') {
        let data = "";
        data = await connectObj.objConnect.joinRecords();
        return data;
    } else {
        let data = "";
        data = await connectObj.objConnect.findAllRecords(tableName);
        // data = modelsData;
        return data;
    }
    // modelsData = await connectObj.objConnect.findAllRecords(tableName);
    // data = modelsData;
    // return data;
}

module.exports = {
    getAPI: getAPI
}