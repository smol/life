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

		browserify: {
			dist: {
				options: {
					transform: [
						["babelify", {
							presets: ['es2015']
						}]
					],
					browserifyOptions: {
						debug: true
					},
					watch: true, // use watchify for incremental builds!
					keepAlive: true, // watchify will exit unless task is kept alive
					exclude: ['./client/node_modules/**/*', './client/build/**/*'],
					ignore: ['./client/node_modules/**/*', './client/build/**/*']
				},
				files: {
					// if the source file has an extension of es6 then
					// we change the name of the source file accordingly.
					// The result file's extension is always .js
					"./client/build/app.js": ['./client/**/*.js']
				}
			}
		},

		// watch: {
		// 	scripts: {
		// 		files: ['client/**/*.js', '!client/node_modules/**/*', '!client/build/**/*'],
		// 		tasks: ['browserify'],
		// 		options: {
		// 			atBegin: true
		// 		}
		// 	}
		// },

		concurrent: {
			dev: {
				tasks: ['nodemon:server', 'browserify'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('dev', [
		'concurrent:dev'
	]);

};
