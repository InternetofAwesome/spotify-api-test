var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //parse bodies of requests
var multer = require('multer'); // for body parser?
var upload = multer(); // for parsing multipart/form-data
var querystring = require('querystring');
var request = require('request')

app.use(bodyParser.json()); // for parsing application/json

app.use(express.static('client')); //serves up the client dir

var api_key = ''

app.get('/key', function(req, res){
  console.log(JSON.stringify(req.query.hash));
  res.send('key request: ' + JSON.stringify(req.query.hash) )
});

app.put('/key', upload.array(), function(req, res, next){
  console.log('body: ' + req.body.hash)
  console.log(req.body.token);
  api_key = req.body.token
  // res.send('api key: ' + api_key)
  request({url: "https://api.spotify.com/v1/users/voltaicsca/playlists", headers: {"Authorization": "Bearer " + api_key}}, function(error, response, body) {
    console.log("data from spotify:")
    console.log(body);
    res.send(body);
  });

})

var server = app.listen(process.env.PORT, process.env.ADDRESS, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});