routersApp = function(connectObj) {
    const express = require('express');
    // const bodyParser = require('body-parser')
    const path = require('path');
    const urlAPI = require('./urls');
    const url = require('url');
    // const objConnect = require('./urls');

    const app = express();

    app.use(express.static(path.join(process.cwd(), '/front/build')));

    app.get('/', function (req, res) {
        res.sendFile(path.resolve(process.cwd(), '/front/build', 'index.html'));
    });

    app.get('/data/:table', async function (req, res) {
        let dataAPI = await urlAPI.getAPI(res, connectObj, req.params.table);
        // connectObj.objConnect.checkConnection();
        console.log("hello raf", dataAPI);
        return res.send(dataAPI);
    });

    app.get('/edit', async function (req, res) {
        
        var q = url.parse(req.url, true).query;
        urlAPI.editDB(q, connectObj);
        return res.send("ok");
    });

    app.get('/delete', function (req, res) {
        var q = url.parse(req.url, true).query;
        urlAPI.deleteRowDB(q, connectObj);
        res.redirect('/');
    });

    app.get('/user', function (req, res) {
        res.redirect('/');
    });
     
    // app.get('/user', function (req, res) {
    //     res.send("Redirected to User Page");
    // });

    app.get('/ping', function (req, res) {
        return res.send('pong');
    });

    

    const PORT = 8080;

    app.listen(PORT, () => {});
}

module.exports = {
    routersApp: routersApp
}