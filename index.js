var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('traffic', 'a user connected');
  socket.on('disconnect', function(){
    console.log('a user disconnected');
    io.emit('traffic', 'a user disconnected');
  });  
});

io.on('connection', function(socket){
  socket.on('chat message', function(name, msg){
    io.emit('chat message', name, msg);
    console.log(name, 'writes', msg);   
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});