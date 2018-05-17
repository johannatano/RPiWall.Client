var server = require('http').createServer();
var io = require('socket.io')(server);

function SocketServer (){

}

var s = SocketServer;
var p = SocketServer.prototype;


p.start = function(port){
	
	io.on('connection', function(client){
	  client.on('event', function(data){});
	  client.on('disconnect', function(){});
	});
	server.listen(port);
	console.log('Socket server started at port', port)
}

p.emit = function(event, data){
	io.sockets.emit(event, data);
}

module.exports = SocketServer;