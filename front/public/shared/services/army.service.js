(function(){
	'use strict';

	angular.module('life').service('virusService', ['$q', '$http', function($q, $http){
		return {
			all : function(){
				return $http.get('api/v1/army/').then(function(response) {
					return response.data;
				});
			},
			add : function(data){
				console.warn(data);
				return $http.post('api/v1/army/', data).success(function(data, status, headers, config) {
					return data;
				});
			}
		};
	}]);
})();
