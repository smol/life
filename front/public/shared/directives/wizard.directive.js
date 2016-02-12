(function(){
	'use strict';

	angular.module('life').directive('wizard', [function(){
		return {
			restrict : 'E',
			transclude : true,
			replace : true,
			scope : {
				display:'=',
				endCallback : '='
			},
			template : ''+
				'<div class="wizard ng-hide-animate" data-ng-show="display">'+
					'<a href="javascript:" data-ng-click="display=false;" class="close">Close</a>'+
					'<div data-ng-transclude></div>' +
					'<div class="controls">'+
						'<a href="javascript:" class="prev link" data-ng-click="prev()">Précedent</a>'+
						'<a href="javascript:" class="next primary" data-ng-click="next()">{{next_label}}</a>'+
					'</div>' +
				'</div>',
			link : function(scope, element, attrs){
				var current_index = 0;
				var section = element.find('section');

				var prev_button = element[0].getElementsByClassName('prev');
				scope.next_label = 'Suivant';

				function index_changed(index){

					if (index == 0){
						angular.element(prev_button).addClass('disable');
					} else {
						angular.element(prev_button).removeClass('disable');
					}


					scope.next_label = index + 1 === section.length ? 'Terminer' : 'Suivant';

					for (var i = 0; i < section.length; i++){
						angular.element(section[i]).css({
							'display' : i === index ? 'block' :'none'
						});
					}
				}

				scope.prev = function(){
					index_changed(--current_index);
				};

				scope.next = function(){
					++current_index;

					if (current_index == section.length){
						scope.display = false;
						scope.endCallback && scope.endCallback();
						return;
					}
					index_changed(current_index);
				};

				index_changed(0);
			}
		};
	}]);
})();
