(function(){
	var express = require('express');
	var app = express();
	var server = require('http').Server(app);
	var io = require('socket.io')(server);

	// var mongoose = require('mongoose');
	var morgan = require('morgan');
	var body_parser = require('body-parser');
	var method_override = require('method-override');

	app.use(express.static(__dirname + '/front/build'));
	app.use(morgan('dev'));
	app.use(body_parser.urlencoded({'extended' : 'true'}));
	app.use(body_parser.json());
	app.use(body_parser.json({ type : 'application/vnd.api+json' }));
	app.use(method_override());


	var Kernel = require('./server/kernel');

	var life_app = new Kernel(app);

	life_app.start();

	app.listen(8080);
	console.log('App listening on port 8080');

	// io.on('connection', function(socket){
	// 	socket.emit('news', {hello : 'world'});
	// 	socket.on('other', function(data){
	// 		console.log('data', data);
	// 	});
	// });

	// var user = mongoose.model('User', { name : String });
	// var test = new user({name : 'test'});
	// test.save(function(err){
	// 	if (err)
	// 		console.log('meow');
	// });

	// app.post('/authenticate', function(req, res){
	// 	var model = require('./server/models/user.model').user_model();
	//
	// 	model.find_one({login : req.body.login}).then(function(result){
	// 		if (!result){
	// 			res.json({error : 'This account doesn\'t exist.'});
	// 			return null;
	// 		}
	// 		return result;
	// 	}).then(function(result){
	// 		if (req.body.password !== result.password){
	// 			res.json({error : 'Your password is invalid.'});
	// 			return;
	// 		}
	// 		var expires = moment().add(7,'days').valueOf();
	//
	// 		var token = jwt.encode({
	// 			id: result._id,
	// 			exp: expires
	// 		}, app.get('jwtTokenSecret'));
	//
	// 		res.cookie('token', token);
	// 		res.json({ success : true, user : { login : result.login } });
	// 	}).catch(function(err){
	// 		console.warn('err', err);
	// 	});
	// });
	//
	// app.post('/create_account/', function(req, res){
	// 	var model = require('./server/models/user.model').user_model();
	//
	//
	// 	model.find_one({login : req.body.login}).then(function(result){
	// 		if (result){
	// 			res.json({error : 'This account already exists.'});
	// 			return null;
	// 		}
	// 		return model.create(req.body);
	// 	}).then(function(result){
	// 		if (!result)
	// 			return;
	// 		var expires = moment().add(7,'days').valueOf();
	//
	// 		var token = jwt.encode({
	// 			id: result._id,
	// 			exp: expires
	// 		}, app.get('jwtTokenSecret'));
	//
	// 		res.cookie('token', token);
	// 		res.json({ success : true, user : { login : result.login } });
	// 	}).catch(function(err){
	// 		console.warn('err', err);
	// 	});
	// });
	//
	// app.get('/verify_token/', function(req, res) {
	//
	// 	try {
	// 		var decoded = jwt.decode(req.cookies.token, app.get('jwtTokenSecret'));
	// 		if (decoded.exp <= Date.now()){
	// 			res.status(401).json({error : 'The token expired.'});
	// 			return;
	// 		}
	//
	// 		var model = require('./server/models/user.model').user_model();
	// 		model.find_one({_id : decoded.id}).then(function(result){
	// 			if (!result){
	// 				res.status(401).json({error : 'The account doesn\'t exist anymore.'});
	// 				return;
	// 			}
	//
	// 			res.json({login : result.login});
	// 		});
	// 	} catch (err){
	// 		res.status(400).json({error : err});
	// 	}
	// });
	//
	// app.get('/logout/', function(req, res){
	// 	res.clearCookie('token');
	// 	res.json({});
	// });


	// app.get('/', function(req, res) {
	// 	res.sendFile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
	// });
})();
