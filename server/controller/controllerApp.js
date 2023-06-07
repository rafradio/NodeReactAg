controllerApp = function() {
    var mainApp = require('../routers/routers');
    mainApp.routersApp();
    console.log(process.cwd());
}

module.exports = {
    mainApp: controllerApp
}