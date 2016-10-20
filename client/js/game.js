
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var playerNameInput = document.getElementById('playerNameInput');

function Game() {

};

var player = {
  id: -1,
  x: screenWidth / 2,
  y: screenHeight / 2,
  screenWidth: screenWidth,
  screenHeight: screenHeight,
  target: {x: screenWidth / 2, y: screenHeight / 2,}
};


var playerNameInput = document.getElementById('playerNameInput');

Game.prototype.handleNetwork = function(socket) {
  console.log('Game connection process here');

  socket.on('welcome',function(playerSettings){
    console.log("Welcome connection");
    player.name = playerNameInput.value.replace(/(<([^>]+)>)/ig, '').substring(0,25);
    console.log(playerSettings);
    socket.emit('gotit', player);


  });
  // This is where you receive all socket messages
}

Game.prototype.handleLogic = function() {
  console.log('Game is running');
  // This is where you update your game logic
}

var pos = 0;

Game.prototype.handleGraphics = function(gfx) {

  // This is where you draw everything
  gfx.fillStyle = '#fbfcfc';
  gfx.fillRect(0, 0, screenWidth, screenHeight);

  gfx.fillStyle = '#2ecc71';
  gfx.strokeStyle = '#27ae60';
  gfx.font = 'bold 50px Verdana';
  gfx.textAlign = 'center';
  gfx.lineWidth = 2;
  gfx.fillText('Welcome '+playerNameInput.value, screenWidth / 2, screenHeight / 2);
  gfx.beginPath();
  gfx.arc(pos,pos,10,0,2*Math.PI);
  gfx.stroke();
  gfx.fill();
  pos++;
}

