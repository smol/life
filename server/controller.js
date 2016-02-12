(function(){
	'use strict';

	module.exports = {
		get : function get(req, res, next){
			console.error('THERE\'S NO GET METHOD');
		},
		post : function post(req, res, next){
			console.error('THERE\'S NO POST METHOD');
		},
		put : function put(req, res, next){
			console.error('THERE\'S NO PUT METHOD');
		}
	};
})();
