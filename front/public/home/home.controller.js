(function(){
	'use strict';

	angular.module('life').controller('HomeController', ['$scope', '$http', 'virusResolver', 'virusService', 'socketIO', function($scope, $http, virusResolver, virusService, socketIO){
		$scope.viruses = virusResolver;
		console.warn('TATA');

		// socketIO.on('connect', function(){
		// 	socketIO.send('hi');
		// 	socketIO.on('message', function(msg){
		// 		console.warn(msg);
		// 	});
		// });
		// console.warn($scope.viruses);

		$scope.new_user = {
			email : null,
			password : null,
			retyped_password : null
		};

		$scope.map_states = {
			disabled : false,
			choose_location : false
		};

		$scope.new_army = {
			type : 'zombie',
			name : 'test'
		};

		$scope.post = function(){
			virusService.add($scope.new_army).then(function(response){
				console.warn('response', response.data);
			});
		};

		$scope.tile_selected = function(tile){
			console.warn('tile_selected', tile);
		};

		// $scope.addentry = function(){
		// 	virusService.add({toto:'toto'});
		// };
	}]);
})();
