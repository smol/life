(function(){
	'use strict';

	/**
	 * Configuration du module principal : routeApp
	 */
	angular.module('life').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$stateProvider
			.state('root', {
				abstract : true,
				template : '<div data-ui-view></div>',
				controller : 'RootController'
			})
			.state('root.login', {
				templateUrl : 'login/index.html',
				controller : 'LoginController',
				resolve : {
					userResolve : ['userService', function(userService){
						return userService.all();
					}]
				}
			})
			.state('root.layout', {
				abstract:true,
				views : {
					'' : { template : '<div data-ui-view></div>' },
					'header' : {
						templateUrl : 'shared/header.html',
						controller : 'HeaderController'
					},
					'footer' : { templateUrl : 'shared/footer.html' }
				}
			})
			.state('root.layout.home', {
				url : '/',
				templateUrl : 'home/index.html',
				controller : 'HomeController',
				resolve : {
					virusResolver : ['virusService', function(virusService){
						return {'toto' : 'toto'};
					}]
				}
			})
			.state('root.layout.users', {
				url : '/users/',
				templateUrl : 'users/index.html',
				controller : 'UsersController',
				resolve : {
					userResolve : ['UserService', function(UserService){
						console.warn(UserService.all());
						return UserService.all();
					}]
				}
			});

		$urlRouterProvider.when('', '/');
	}]);
})();
