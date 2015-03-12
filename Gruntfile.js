/*global module:false*/
module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ',',
				banner: '[',
				footer: ']',
				process: function(src, src_path) {
					src = src.trim();
					if ('[' !== src.substr(0, 1)) src = '[' + src + ']';
					var bits, path, media, i, z, data = JSON.parse(src);
					z = data.length;
					for (i = 0; i < z; i++){
						media = data[i];
						path = src_path.replace('.json', '.html');
						if (grunt.file.exists(path)) {
							bits = path.split('/');
							bits.shift();
							bits.shift();
							bits.shift();
							bits.shift();
							media.html = bits.join('/');
						}
					}
					src = JSON.stringify(data).trim();
					src = src.substr(1, src.length - 2);
					return src;
				},
			},
			effects: {
				src: ['bower_components/angular-moviemasher/app/module/*/*effect.json', 'app/bower_components/angular-moviemasher/app/module/*/*/*effect.json'],
				dest: 'app/media/json/effect.json'
			},
			themes: {
				src: ['app/bower_components/angular-moviemasher/app/module/*/*/*theme.json', 'app/bower_components/angular-moviemasher/app/module/*/*theme.json'],
				dest: 'app/media/json/theme.json'
			},
			scalers: {
				src: ['app/bower_components/angular-moviemasher/app/module/*/*/*scaler.json', 'app/bower_components/angular-moviemasher/app/module/*/*scaler.json'],
				dest: 'app/media/json/scaler.json'
			},
			transitions: {
				src: ['app/bower_components/angular-moviemasher/app/module/*/*/*transition.json', 'app/bower_components/angular-moviemasher/app/module/*/*transition.json'],
				dest: 'app/media/json/transition.json'
			},
			mergers: {
				src: ['app/bower_components/angular-moviemasher/app/module/*/*merger.json', 'app/bower_components/angular-moviemasher/app/module/*/*/*merger.json'],
				dest: 'app/media/json/merger.json'
			},
		},
		jshint: {
			options: {
				"-W086": true, /* allow fall through in switch statements */
				loopfunc:true,
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: false,
				eqnull: true,
				evil: true,
				browser: true,
				devel: true,
				globalstrict: true,
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			swap: {
				src: 'app/media/js/swap.js'
			}
		},
		uglify: {
			options: {},
			swap: {
				src: 'app/media/js/swap.js',
				dest: 'app/media/js/swap.min.js'
			}
		},
		replace: {
			paths: {
				options: {
					patterns: [
						{
							match: /<div class=["']amm-ui['"]>/g,
							replacement: '<div class="amm-ui" amm-rest-module-search-params-group="@group" amm-rest-module-search-url="../../../../media/json/:group.json" amm-rest-media-search-params-group="@group" amm-rest-media-search-url="../../../../media/json/:group.json">'
						},
						{
							match: /<head>/g,
							replacement: '<head><base href="../bower_components/angular-moviemasher/app/">'
						},
						{
							match: /[.][.]\/bower_components/g,
							replacement: '../..'
						}
					]
				},
				files: [{
						expand: true, 
						flatten: true, 
						src: 'app/bower_components/angular-moviemasher/app/index.html',
						dest: 'app/demo/'
					}]
			}
		},
		/*markdown: {
			all: {
				options: {
					markdownOptions: {
						gfm: true,
						highlight: 'auto',
						codeLines: {
							before: '<span style="overflow-x:hidden;">',
							after: '</span>'
						}
					}
				},
				files: [{
					expand: true,
					rename: function(dest, src_path){	
						console.log('rename', dest, src_path);
						var bits = src_path.split('/');
						bits.pop();
						return dest + bits.pop() + '.html';
					},
					src: [
						'app/bower_components/moviemasher.js/README.md',
						'app/bower_components/angular-moviemasher/README.md',
						'moviemasher.rb/README.md',
					],
					ext: '.html'
				}]
			}
		}*/
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-copy'); 'copy', 
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-uglify'); 
	//grunt.loadNpmTasks('grunt-markdown');'markdown',
	grunt.registerTask('default', ['concat', 'jshint', 'uglify', 'replace']);
};

	
	
