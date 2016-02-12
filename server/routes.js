(function(){
	'use strict';

	var base_url = '/api/v1';
	var user_controller = require('./controller/user.controller');

	var Routes = function Routes(app){
		console.warn(user_controller);
		app.get(base_url + '/user', user_controller.get);
		app.post(base_url + '/user', user_controller.post);
	};

	module.exports = Routes;
})();
