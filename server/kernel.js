(function(){

	var Routes = require('./routes');

	var Kernel = function Kernel(app){
		console.warn('app');

		this.routes = new Routes(app);
	};

	Kernel.prototype.start = function () {
		console.warn('start server');
	};

	module.exports = Kernel;

})();
