// js/script.js
(function(){
	'use strict';


	/**
	 * Déclaration de l'application routeApp
	 */
	angular.module('life', [
		// Dépendances du "module"
		'ui.router',
		'ngCookies'
	]);

	angular.module('life').run([
		'$rootScope', '$state', '$stateParams', '$cookies',
		function($rootScope, $state, $stateParams, $cookies) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
			console.warn('$stateChangeError: ', event, toState, toParams, fromState, fromParams, error);
			if (error) {
				switch(error.code) {
					case 404:
						$state.go('root.public.404', {error: error}, {location:false});
						break;
					default:
						$state.go('root.public.error', {error: error}, {location:false});
				}
			}
		});

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			console.warn(toState.name);
			if (toState.name !== 'root.login' && !$cookies.get('token')){
				$state.go('root.login');
				event.preventDefault();
				return;
			} else if (toState.name !== 'root.login' && !$rootScope.user) {


				// userService.verify_token().then(function success(response){
				// 	var params = angular.copy(toParams);
				// 	$rootScope.user = response.data;
				// 	$state.go(toState.name, params);
				// }, function error(error){
				// 	$state.go('root.login');
				// });
				// event.preventDefault();
				return;
			}
		});

		$rootScope.$on('$stateChangeSuccess',function(){

		});
	}]);
})();
