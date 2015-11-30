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

app.put('/key', function(req, res, next){
  console.log(req.body);
  api_key = req.body.token
  // res.send('api key: ' + api_key)
  request({url: "https://api.spotify.com/v1/users/maximumtunage/playlists", headers: {"Authorization": "Bearer " + api_key}}, function(error, response, body) {
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