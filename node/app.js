var cl = require('./cleanup').Cleanup(cleanup);
var clc = require('cli-color');
require('dotenv').load();
var ip = require('ip');
var spawn = require('child_process').spawn;


var player;




function cleanup() {
	console.log('App specific cleanup code...');
};


var ID = process.env.ID;
var SERVER_IP = '172.24.245.55';
var SERVER_IP = '192.168.1.134';
var SERVER_IP = '192.168.31.184';
// var SERVER_IP = '172.24.245.51';
// var socket = require('socket.io-client')('http://192.168.31.70:3000');
var socket = require('socket.io-client')('http://' + SERVER_IP + ':3000');
// var socket = require('socket.io-client')('http://172.20.10.2:3000');




var TILE_DATA = {
	settings: {},
	lastSeen: 0,
	IP: ip.address(),
	id: ID
};

// var socket = require('socket.io-client')('http://192.168.1.90:3000');
socket.on('connect', function(){

	console.log('connected to socket');

	socket.on('init', function(tiles){
		// console.log('init', tiles);

		for(var i in tiles){
			var tile = tiles[i];
			if(tile.id == ID){
				TILE_DATA.settings = tile.settings;
				// console.log('HERE', TILE_DATA.settings.show);
				restart_playback();
			}
		}
		setInterval(ping, 5000);
	});

	socket.on('changed:tile_data:' + ID + ':settings', function(data){
		console.log('settings changed, reloading scripts');
		TILE_DATA.settings = data.settings;
		restart_playback();
	});

	socket.on('rpi:stop:' + ID, function(data){
		stop_playback();
	});

	socket.on('rpi:start:' + ID, function(data){
		restart_playback();
	});


	socket.on('rpi:update_source', function(data){
		update_source();
	});

	socket.on('rpi:restart_playback', function(data){
		restart_playback();
	});

	socket.on('rpi:restart_app', function(data){
		process.exit(2);
	});

	socket.on('rpi:reboot', function(data){
		var args = [];
		args.push('../reboot.sh');
		var p = spawn('sh', args);
	});

	socket.on('disconnect', function(){
		process.exit(2);
	});
	
});







function ping(){
	console.log('PING');
	TILE_DATA.lastSeen = new Date().getTime();
	TILE_DATA.IP = ip.address();

	socket.emit('update', {type: 'set:tile_data:status', data: [TILE_DATA]});
}


function update_source(){
	var args = [];
	args.push('../update_source.sh');
	var p = spawn('sh', args);

	p.on('close', (code) => {
		process.exit(2);
	});

}



function restart_playback(){
	var args = [];
	args.push('../player.sh');

	if(ID == 4 || !TILE_DATA || !TILE_DATA.settings){
		args.push('0,0,1,1');
	}else{
		args.push(TILE_DATA.settings.show.x + ',' + TILE_DATA.settings.show.y + ',' + TILE_DATA.settings.show.w + ',' + TILE_DATA.settings.show.h);//which cam device to use
	}

	var p = spawn('sh', args);
}

function stop_playback(){
	var args = [];
	args.push('../stop.sh');
	var p = spawn('sh', args);
}

