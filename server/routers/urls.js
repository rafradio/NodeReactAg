const getAPI = async function(res) {
    var modelDB = require('../models/models');
    modelsData = await modelDB.connectDB();
    data = modelsData;
    return data;
}

module.exports = {
    getAPI: getAPI
}