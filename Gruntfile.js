'use strict';
var path = require('path');
// var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
	return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: {
				src: [".sass-cache"]
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded',
					"sourcemap=none": '',
					noCache: true
				},
				files: [
					{
						expand: true,
						cwd: '01_dev/sass/',
						src: ['**/*.scss'],
						dest: '02_production/css/',
						ext: '.css'
					}
				]
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: '02_production/css/',
				src: ['*.css', '!*.min.css'],
				dest: '02_production/css/',
				ext: '.css'
			}
		},

		uglify: {
			my_target: {
				files: [{
					expand: true,
					cwd: '02_production/js/',
					src: ['**/*.js', '!**/*.min.js', '!*.min.js', '!lib/*.js'],
					dest: '02_production/js',
					ext: '.js'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					cwd: '02_production/',
					src: ['*.html'],
					dest: '02_production/'
				}]
			}
		},

		copy: {
			js: {
				files: [
					{
						expand: true,
						cwd: '01_dev/js',
						src: '**',
						dest: '02_production/js'
					}
				],
			},
        },
        
        replace: {
            html: {
              src: ['02_production/*.html'],
              overwrite: true,
              replacements: [{
                from: '<script src="//localhost:35729/livereload.js"></script>',
                to: ''
              }]
            }
        },

        htmlbuild: {
            dist: {
              src: '01_dev/template/index.html',
              dest: '02_production/',
              options: {
                beautify: true,
                relative: true,
                basePath: false,
            sections: {
                  layout: {
                    header: '01_dev/template/components/header.html',
                    footer: '01_dev/template/components/footer.html',
                    breadCrumbs: '01_dev/template/components/bread-crumbs.html',
                    sectionProfile: '01_dev/template/components/section-profile.html',
                    sectionVideo: '01_dev/template/components/section-video.html',
                    sectionSlider: '01_dev/template/components/section-slider.html'
                  }
                },
              }
            }
        },

		connect: {
			server: {
				options: {
					port: 8000,
					base: '02_production/',
					hostname: '*'
				}
			}
		},

		watch: {
			options: {
				dateFormat: function(time) {
					grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Waiting for new changes ...');
				},
			},
			sass: {
				files: '01_dev/sass/**/*',
                tasks: ['sass'],
                options: {
                    livereload: true,
                }
            },
			js: {
				files: '01_dev/js/**/*',
                tasks: ['copy:js'],
                options: {
                    livereload: true,
                }
            }, 
            html: {
				files: '01_dev/template/**/*',
                tasks: ['htmlbuild'],
                options: {
                    livereload: true,
                }
            }
		} // end watch
    });
    
    grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-html-build');

	grunt.registerTask('default', ['watch']); // this is the default command, use in terminal 'grunt'
    grunt.registerTask('dev', ['connect', 'sass', 'copy:js', 'htmlbuild', 'clean', 'watch']); // use 'grunt dev' for development
    grunt.registerTask('prod', ['sass', 'copy:js', 'uglify', 'cssmin', 'htmlbuild', 'replace', 'htmlmin', 'clean']); // use 'grunt prod' for development
};
