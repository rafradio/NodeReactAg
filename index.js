const express = require('express');
// var mainApp = require('./funcs/main');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './front/build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './front/build', 'index.html'));
  });

const PORT = 8080;

app.listen(PORT, () => {});