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

const deleteRowDB = function(q, connectObj) {
    connectObj.objConnect.deleteRecord(q);
    console.log(q.tableName, " Удаление ", q.id);
}

const addRowDB = function(data, connectObj) {
    connectObj.objConnect.addRecord(data);
}

module.exports = {
    getAPI: getAPI,
    editDB: editDB,
    deleteRowDB: deleteRowDB,
    addRowDB: addRowDB
}