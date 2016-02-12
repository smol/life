(function(){
	'use strict';

	angular.module('life').directive('mapRenderer', [ 'ThreeWrapper', 'Planet', function(ThreeWrapper, Planet){
		return {
			restrict : 'E',
			replace : true,
			scope : {
				model : '=',
				states : '='
			},
			template : '<div></div>',
			link : function(scope, element, attrs){
				var three_wrapper;
				var scene, camera;
				var planet, hexasphere;
				var hexasphere_mesh;

				var raycaster = new THREE.Raycaster();

				var three_wrapper = new ThreeWrapper();
				element[0].appendChild(three_wrapper.renderer.domElement);
				element[0].addEventListener('mousedown', mouse_down, false);
				element[0].addEventListener('mousemove', mouse_move, false);

				three_wrapper.camera.position.set(0, 200, 200);

				three_wrapper.create_lights();
				three_wrapper.create_skybox();

				var planet = new Planet(three_wrapper, {
					radius : 50,
					title : 'Terre',
					prefix : 'earth',
				});

				planet.load().then(function(planet_group){
					three_wrapper.scene.add(planet.group);
				});

				three_wrapper.render(animate);

				function animate(deltaTime){
					planet.animate(deltaTime);
				}

				function get_mouse_coord(){
					var x = 0, y = 0;

					if ( event.changedTouches ) {
						x = event.changedTouches[0].pageX;
						y = event.changedTouches[0].pageY;
					} else {
						x = event.clientX;
						y = event.clientY;
					}

 					return {
						x : (x / three_wrapper.SCREEN_WIDTH) * 2 - 1,
						y : 1 - (y / three_wrapper.SCREEN_HEIGHT) * 2
					};
				}

				function mouse_down(){
					var mouse = get_mouse_coord();

					raycaster.setFromCamera(mouse, three_wrapper.camera);

					var intersects = raycaster.intersectObjects(three_wrapper.scene.children, true);

					if (intersects.length > 0){
						if (intersects[0].object.userData.selected)
							intersects[0].object.userData.selected(true);
						else
							console.warn('ERROR intersects objet',intersects[0].object);
					}
				}


				var last_tile = null;
				function mouse_move(){
					var mouse = get_mouse_coord();

					raycaster.setFromCamera(mouse, three_wrapper.camera);

					var intersects = raycaster.intersectObjects(three_wrapper.scene.children, true);

					if (last_tile)
						last_tile.hover(false);

					if (intersects.length > 0){
						if (intersects[0].object.userData.hover){
							intersects[0].object.userData.hover(true);
							last_tile = intersects[0].object.userData;
						}
					}
				}

				scope.$watch('states', function(){
					if (scope.states.choose_location){
						console.warn('choose location');
					}
				}, true);
				//
				// scope.$watch('model', function(){
				// 	for (var i = 0; i < scope.model.length; i++){
				//
				// 		var tile = hexasphere.findTile(parseFloat(scope.model[i].latitude), parseFloat(scope.model[i].longitude));
				// 		tile.toggle(true);
				// 	}
				// }, true);

				// init(element);



				animate();
			}
		};
	}]);
})();
