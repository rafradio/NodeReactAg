

routersApp = function() {
    const express = require('express');
    const bodyParser = require('body-parser')
    const path = require('path');
    const urlAPI = require('./urls');

    const app = express();

    app.use(express.static(path.join(process.cwd(), '/front/build')));

    // console.log("hello raf", modelsData);

    app.get('/data', async function (req, res) {
        let dataAPI = await urlAPI.getAPI(res);
        console.log("hello raf", dataAPI);
        return res.send(dataAPI);
    });

    app.get('/ping', function (req, res) {
        return res.send('pong');
    });

    app.get('/', function (req, res) {
        res.sendFile(path.resolve(process.cwd(), '/front/build', 'index.html'));
    });

    const PORT = 8080;

    app.listen(PORT, () => {});
}

module.exports = {
    routersApp: routersApp
}