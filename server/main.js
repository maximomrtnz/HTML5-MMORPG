var express = require('express');
var app = express();
var serv = require('http').Server(app);
var path = require('path');

var World = require('./world');
var Player = require('./player');
var DatabaseHandler = require('./database/databasehandler');

var world = new World();
var databasehandler = new DatabaseHandler();

app.use(express.static(path.join(__dirname, '../client')));
 
app.get('/',function(req, res) {
    res.sendfile('client/index.html')
});

serv.listen(2000);

console.log('Server started.');
 
var DEBUG = true;
 
var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){

    socket.id = Math.random();
    socket.x = 0;
    socket.y = 0;

    world.onPlayerConnect(new Player(socket,world));
   
});
 
setInterval(function(){
    world.update();
},1000/25);