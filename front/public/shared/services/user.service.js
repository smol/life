(function(){
	'use strict';

	angular.module('life').service('userService', ['$http', function($http){
		return {
			all : function(){
				return $http.get('/api/v1/user/').then(function(response){
					return response.data;
				});
			}
		};
	}]);
})();
