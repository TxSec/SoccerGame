var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

var config  = require('./config.json');

app.use(express.static(__dirname + '/../client'));

io.on('connection', function (socket) {
  console.log('A user connected!', socket.handshake.query.type);
  var currentPlayer = "Hola";
  io.emit('welcome', currentPlayer);
  // Write your code here
});

var serverPort = process.env.PORT || config.port;
http.listen(serverPort, function() {
  console.log("Server is listening on port " + serverPort);
});
