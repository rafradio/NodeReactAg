controllerApp =  function() {
    var mainApp = require('../routers/routers');
    var connectObj = require('./connectObj');
    // modelsData = await modelDB.connectDB();
    // console.log("Hello max" , modelsData);
    connectObj.objConnect.checkConnection();
    mainApp.routersApp(connectObj);
    console.log(process.cwd());
}

module.exports = {
    mainApp: controllerApp
}