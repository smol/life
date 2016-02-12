(function(){
	'use strict';

	angular.module('life').directive('icon', ['$http', function($http){
		return {
			restrict : 'E',
			replace : true,
			scope : {
				idSvg : '='
			},
			template : '<div class="icon"></div>',
			link : function(scope, element, attrs){
				$http.get('/static/assets/spritesheet.svg').then(function(response){
					var index = response.data.indexOf('<svg');
					var svg = angular.element(response.data.substr(index, response.data.length - index));
					var icon_text = svg[0].getElementById(scope.idSvg);

					element.append('<svg viewBox="0 0 50 50" width="50" height="50">'+icon_text.outerHTML+'</svg>');
				});
			}
		};
	}]);
})();
