(function(){
	'use strict';

	var UserController = require('../controller');

	UserController.get = function get(req,res,next){
		res.send(JSON.stringify({'toto' : 'toto'}));
	};

	UserController.connect = function connect(){

	};

	module.exports = UserController;
})();
