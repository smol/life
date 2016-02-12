(function(){
	'use strict';

	angular.module('life').factory('Planet', ['$q', '$http', 'Hexasphere', function($q, $http, Hexasphere){
		// config : {
		// 	radius (number),
		// 	prefix (string),
		// 	title (string),
		// 	hexasphere (bool),
		// }

		var Planet = function(three_wrapper, config){

			console.warn('load planet', config);
			// parameters : radius, subDivisions, tileWidth
			this.hexasphere = new Hexasphere(config.radius + 0.5, 15, 1);

			this.three_wrapper = three_wrapper;
			this.config = config;
		};

		Planet.prototype.load = function(){
			var deferred = $q.defer();
			var self = this;

			$q.all([
				this.three_wrapper.load_texture(this.config.prefix + 'map.jpg'),
				$http.get('/static/assets/shaders/planet.vs'),
				$http.get('/static/assets/shaders/planet.fs'),
				$http.get('/static/assets/shaders/atmosphere.vs'),
				$http.get('/static/assets/shaders/atmosphere.fs'),
				this.hexasphere.geometry()
			]).then(function(response){
				var geometry = new THREE.SphereGeometry(self.config.radius, 40, 40);

				var uniforms = THREE.UniformsUtils.merge([
					THREE.UniformsLib['lights'],
					{ texture : { type : 't', value : null } },
				]);

				uniforms.texture.value = response[0];

				var shader = new THREE.ShaderMaterial({
					uniforms : uniforms,
					vertexShader : response[1].data,
					fragmentShader : response[2].data,
					// transparent : true,
					lights : true
				});

				self.planet = new THREE.Mesh(geometry, shader);

				var atmosphere = new THREE.SphereGeometry(self.config.radius + 7, 32, 40);

				var atmosphere_shader = new THREE.ShaderMaterial({
					side : THREE.BackSide,
					blending : THREE.AdditiveBlending,
					uniforms : {},
					vertexShader : response[3].data,
					fragmentShader : response[4].data,
					transparent : true
				})

				var atmosphere_mesh = new THREE.Mesh(atmosphere, atmosphere_shader);

				self.group = new THREE.Object3D();
				self.group.add(self.planet);
				self.group.add(response[5]);
				self.group.add(atmosphere_mesh);

				deferred.resolve(self.group);
			});

			return deferred.promise;
		};

		Planet.prototype.animate = function(){
			if (this.planet && this.hexasphere.group){
				// this.planet.rotation.y += 0.08 * deltaTime;
				// this.hexasphere.group.rotation.y += 0.08 * deltaTime;
			}

			if (this.group)
				this.group.rotation.y += 0.1 * this.three_wrapper.delta_time;

			// console.warn(this.three_wrapper.delta_time);
			if (this.hexasphere)
				this.hexasphere.update(this.three_wrapper.delta_time);
		};

		return Planet;
	}]);
})();
