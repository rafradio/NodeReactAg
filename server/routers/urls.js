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

const editDB = function(q, connectObj) {
    connectObj.objConnect.editRecords(q);
    console.log(q.tableName);
}

module.exports = {
    getAPI: getAPI,
    editDB: editDB
}