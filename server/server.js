'use strict';

var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var sat     = require('sat');
var config  = require('./config.json');
app.use(express.static(__dirname + '/../client'));
var users = [];


io.on('connection', function (socket) {

  var position = randomPosition(10);
  var currentPlayer = {
    id: socket.id,
    x: position.x,
    y: position.y,
    w: 10,
    h: 10,
    };


  users.push(currentPlayer);

  socket.emit('welcome', currentPlayer);

  console.log('Total players: ' + users.length);

  socket.on('gotit',function (player) {
    console.log('[INFO] Player ' + player.name + ' connecting!');
  });

});



var serverPort = process.env.PORT || config.port;
http.listen(serverPort, function() {
  console.log("Server is now listening on port " + serverPort);
});

var randomPosition = function (radius) {
  return {
    x: randomInRange(radius, 800 - radius),
    y: randomInRange(radius, 600 - radius)
  };
};

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
