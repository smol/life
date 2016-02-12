'use strict';

angular.module('life').controller('UsersController', ['$scope', '$http', 'userResolve', function($scope, $http, userResolve){
	$scope.users = userResolve;
}]);
