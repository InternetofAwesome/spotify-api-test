var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //parse bodies of requests
var multer = require('multer'); // for body parser?
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json

app.use(express.static('client')); //serves up the client dir

var api_key = ''

app.get('/key', function(req, res){
  console.log(JSON.stringify(req.query.hash));
  res.send('key request: ' + JSON.stringify(req.query.hash) )
});

app.put('/key', upload.array(), function(req, res, next){
  console.log('body: ' + JSON.stringify(req.body))
  console.log('query: ' + JSON.stringify(req.query))
  res.send('key request: ' + JSON.stringify(req.body))
})

var server = app.listen(process.env.PORT, process.env.ADDRESS, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});