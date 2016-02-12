(function(){
	'use strict';

	angular.module('life').factory('ThreeWrapper', ['$q', function($q){
		var manager = new THREE.LoadingManager();
		var Utils = function(){
			this.delta_time = 0;
			this.SCREEN_WIDTH = window.innerWidth;
			this.SCREEN_HEIGHT = window.innerHeight - 115; // innerHeight - (header's height + footer's height);

			this.scene = new THREE.Scene();

			this.renderer = new THREE.WebGLRenderer({antialias : true});
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

			var VIEW_ANGLE = 45, ASPECT = this.SCREEN_WIDTH / this.SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

			this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
			this.camera.lookAt(this.scene.position);
			this.scene.add(this.camera);

			THREEx.WindowResize(this.renderer, this.camera);

			var self = this;

			this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

			function onWindowResize() {
				self.SCREEN_WIDTH = window.innerWidth;
				self.SCREEN_HEIGHT = window.innerHeight - 115;

				self.camera.aspect = self.SCREEN_WIDTH / self.SCREEN_HEIGHT;
				self.camera.updateProjectionMatrix();

				self.renderer.setSize(self.SCREEN_WIDTH, self.SCREEN_HEIGHT);
			}

			window.addEventListener('resize', onWindowResize, false);
		};

		Utils.prototype.get_manager = function(){
			return manager;
		};

		Utils.prototype.create_lights = function(){
			var light = new THREE.PointLight(0xffffff);
			light.position.set(0,250,0);
			this.scene.add(light);

			var light2 = new THREE.PointLight(0xffffff);
			light2.position.set(0,-250,0);
			this.scene.add(light2);

			var light3 = new THREE.PointLight(0xffffff);
			light3.position.set(0,0,-250);
			this.scene.add(light3);

			var light4 = new THREE.PointLight(0xffffff);
			light4.position.set(0,0,250);
			this.scene.add(light4);
		};

		Utils.prototype.update = function(deltaTime){
			this.controls.update();
			this.callback && this.callback(deltaTime);
		};

		Utils.prototype.render = function(callback){
			var now;
			var dt = 0;
			var last = timestamp();
			var step = 1 / 30;

			var self = this;

			this.callback = callback;

			function timestamp() {
				return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
			}

			function frame(){
				now = timestamp();

				var temp = Math.min(1, (now - last) / 1000)

				dt = dt + temp;

				while(dt > step) {
					dt = dt - step;

					self.update();
				}

				self.delta_time = temp;

				self.renderer.render(self.scene, self.camera);
				last = now;

				requestAnimationFrame(frame);
			}

			requestAnimationFrame(frame);

			this.controls.domElement.addEventListener('mousewheel', self.controls.onMouseWheel, false);
			document.addEventListener('mousemove', self.controls.onMouseMove, false);
			document.addEventListener('mouseup', self.controls.onMouseUp, false);
		};

		Utils.prototype.create_skybox = function(){
			var skyGeometry = new THREE.SphereGeometry(5000, 10, 10 );

			var texture = new THREE.Texture();
			var loader = new THREE.ImageLoader();

			loader.load('/static/assets/starfield.png', function(image){
				texture.needsUpdate = true;
				texture.image = image;
			});

			var material = new THREE.MeshLambertMaterial({
				color : 0xffffff,
				map : texture,
				side:THREE.BackSide
			});

			var skyBox = new THREE.Mesh(skyGeometry, material);
			this.scene.add(skyBox);
		};

		Utils.prototype.load_texture = function(filename){
			var deferred = $q.defer();

			var texture = new THREE.Texture();

			var loader = new THREE.ImageLoader(manager);
			loader.load( '/static/assets/' + filename, function(image) {
				texture.needsUpdate = true;
				texture.image = image;
				deferred.resolve(texture);
			});

			return deferred.promise;
		};

		return Utils;
	}]);
})();
