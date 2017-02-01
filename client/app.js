import Test from './test';

class App {
	constructor() {
		new Test();
		console.warn('coucou le monde');
	}
}

(function () {
	new App();
})();
