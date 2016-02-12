(function(){
	'use strict';

	angular.module('life').directive('grid', ['$compile', '$timeout', function($compile, $timeout){
		function create_header(){
			var template = '' +
						'<div class="header">'+
							'<span class="title" data-ng-bind="item.title" data-ng-repeat="item in header"></span>' +
						'</div>';
			return template;
		}

		function create_template(header, data){
			var columns = '';

			for (var i = 0; i < header.length; i++)
				columns += '<span data-ng-bind="item.'+ header[i].property +'"></span>';

			var template = '' +
						'<ul class="data">' +
							'<li class="item" data-ng-repeat="item in data">'+
								columns +
							'</li>' +
						'</ul>';


			template += '' +
						'<div class="buttons">'+
							'<md-button class="md-raised md-primary" data-ng-click="addentry()">Ajouter</md-button>' +
						'</div>';
			return template;
		}

		return {
			restrict : 'E',
			replace : true,
			scope : {
				data : '=',
				addentry : '='
			},
			link : function(scope, element, attrs){
				var columns = element[0].children;
				scope.header = [];

				for (var i = 0; i < columns.length;i++){
					var child_scope = angular.element(element[0].children[i]).scope();
					scope.header.push({title : child_scope.header, property : child_scope.property});
				}

				var template = angular.element('<div class="grid"></div>');
				template.append($compile(create_header())(scope));

				template.append($compile(create_template(scope.header, scope.data))(scope));
				element.replaceWith(template);
			}
		}
	}]);

	angular.module('life').directive('gridColumn', ['$compile', function($compile){
		return {
			restrict : 'E',
			replace : true,
			scope : {
				header : '@',
				property : '@'
			},
			link : function(scope, element, attrs){
				element.replaceWith($compile('<span data-ng-bind="header"></span>')(scope));
			}
		}
	}]);
})();
