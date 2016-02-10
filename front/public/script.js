(function(){
	'use strict';



	window.onload = function(){
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		var socket = io();

		function update(humans){
			ctx.clearRect(0,0, canvas.width, canvas.height);

			ctx.fillStyle = '#424242';
			ctx.fillRect(0,0,canvas.width, canvas.height);


			for (var i = 0, length = humans.length; i < length; ++i){
				var pos = humans[i].pos;
				var gender = humans[i].gender;

				if (gender === 'M')
					ctx.fillStyle = 'blue';
				else
					ctx.fillStyle = 'pink';

				ctx.fillRect((pos.x * 10) + 10, (pos.y * 10) + 10, 10,10);
			}
		};
		update([]);

		socket.on('update', function(data){
			update(data.humans);
		});

	};
})();
