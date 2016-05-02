// SERVER SIDE CODE

const express = require('express');
const app = express();
const server = require('http').Server(app); 
const io = require('socket.io')(server); 
const locus = require('locus');
var players = [];

io.on('connect', function(socket){
  socket.on('join game', function(name){
    console.log(name);
    players.push({name: name, id: socket.id, player: players.length});
    console.log(players);
    if (players.length<3){
      socket.emit('join', name);
    } else {
      socket.emit('spec');
    }
  });

  socket.on("x move", function(data){
    socket.broadcast.emit("x moved", data)
  });

  socket.on("o move", function(data){
    socket.broadcast.emit("o moved", data)
  });

  socket.on('disconnect', function(){
    var dc = players.find(function(player){
      return player.id === socket.id
    });
    var p = dc.player
    players.splice(p, 1);
    io.emit('left game', dc);
  });

});


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});
server.listen(3000, function(){
  console.log("Listening on port 3000...");
});