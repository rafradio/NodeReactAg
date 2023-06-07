controllerApp = async function() {
    var mainApp = require('../routers/routers');
    // var modelDB = require('../models/models');
    // modelsData = await modelDB.connectDB();
    // console.log("Hello max" , modelsData);
    mainApp.routersApp();
    console.log(process.cwd());
}

module.exports = {
    mainApp: controllerApp
}