(function(){
	var express = require('express');
	var app = express();
	var server = app.listen(8080);
	var http = require('http').Server(app);
	var io = require('socket.io')(server);
	// var fs = require('fs');

	var morgan = require('morgan');
	var body_parser = require('body-parser');
	var method_override = require('method-override');

	app.use(express.static(__dirname + '/build'));
	app.use(morgan('dev'));
	app.use(body_parser.urlencoded({'extended' : 'true'}));
	app.use(body_parser.json());
	app.use(body_parser.json({ type : 'application/vnd.api+json' }));
	app.use(method_override());

	io.on('connection', function(socket){
		console.warn('user connected');
	});

	// var Root = require('./server/root');
	//
	// var root = new Root(io);
	// root.start();

	//
	// app.listen(3000, function(){
	// 	console.log('App listening on port 3000');
	// });
	//

	// io.on('connection', function(socket){
	// 	socket.emit('news', {hello : 'world'});
	// 	socket.on('other', function(data){
	// 		console.log('data', data);
	// 	});
	// });
})();
