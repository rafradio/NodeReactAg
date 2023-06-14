routersApp = function(connectObj) {
    const express = require('express');
    const bodyParser = require('body-parser')
    const path = require('path');
    const urlAPI = require('./urls');
    const url = require('url');
    // const objConnect = require('./urls');

    const app = express();

    app.use(express.static(path.join(process.cwd(), '/front/build')));
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

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

    app.post('/new', function (req, res) {
        let data = req.body;
        console.log("post request ",  data, req.url);
        urlAPI.addRowDB(data, connectObj);
        res.send('ok');
    });
     
    

    const PORT = 8080;

    app.listen(PORT, () => {});
}

module.exports = {
    routersApp: routersApp
}