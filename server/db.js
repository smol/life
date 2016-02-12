(function(){
	'use strict';

	var mongoose = require('mongoose');

	var db_uri = 'mongodb://localhost/contagion';

	mongoose.connect(db_uri);

	mongoose.connection.on('connected', function(){
		console.log('Mongoose default connection open to :' + db_uri);
	});

	mongoose.connection.on('error', function(err){
		console.log('Mongoose default connection error :' + err);
	});

	mongoose.connection.on('disconnected', function(){
		console.log('Mongoose default connection disconnected');
	})

	process.on('SIGINT', function(){
		mongoose.connection.close(function(){
			console.log('Mongoose default connection disconnected through app termination');
			process.exit(0);
		});
	});
})();
