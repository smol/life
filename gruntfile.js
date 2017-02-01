module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		nodemon: {
			server: {
				script: './server/main.js',
				options: {
					watch: ['./server', '!./server/node_modules/**/*'],
				}
			}
		},

		watch: {
			scripts: {
				files: ['client/**/*.js', '!client/node_modules/**/*'],
				tasks: [],
				options: {
					atBegin: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('dev', [
		'nodemon:server',
		'watch:scripts'
	]);

};
