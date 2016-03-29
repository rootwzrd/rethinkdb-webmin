var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('public'));


var port = process.env.port || 8081;
server.listen(port, function () {
  console.log("rethinkdb-webmin listening on port: %s", port);
});
