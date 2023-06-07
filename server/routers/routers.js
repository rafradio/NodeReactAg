routersApp = function() {
    const express = require('express');
    const bodyParser = require('body-parser')
    const path = require('path');

    const app = express();

    app.use(express.static(path.join(process.cwd(), '/front/build')));

    app.get('/ping', function (req, res) {
    return res.send('pong');
    });

    app.get('/', function (req, res) {
        res.sendFile(path.resolve(process.cwd(), '/front/build', 'index.html'));
    });

    const PORT = 8080;

    app.listen(PORT, () => {});
    // console.log(__dirname);
}

module.exports = {
    routersApp: routersApp
}