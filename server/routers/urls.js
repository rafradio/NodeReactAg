const getAPI = async function(res, connectObj, tableName) {
    // var modelDB = require('../models/models');
    modelsData = await connectObj.objConnect.findAllRecords(tableName);
    // modelsData = await modelDB.connectDB();
    data = modelsData;
    return data;
}

module.exports = {
    getAPI: getAPI
}