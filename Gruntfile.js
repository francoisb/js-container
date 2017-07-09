module.exports = function(grunt) {
    var
        _config,
        _banner = '/* js-container - https://github.com/francoisb/js-container */\n';

    _config = {
        clean: {
            build: {
                src: [ 'js-container.js', 'js-container.min.js' ]
            }
        },

        concat: {
            build: {
                src:     [
                            'source/module.header.js',
                            'source/container.js',
                            'source/module.footer.js',
                         ],
                dest:    'build/js-container.js',
                options: {
                             stripBanners: true,
                             banner:       _banner,
                         },
            }
        },

        uglify: {
            build: {
                options: {
                    compress: {
                        global_defs: {
                          DEBUG: false
                        },
                        dead_code: true
                    },
                    mangle: {
                        except: []
                    },
                    banner: _banner
                },
                files: [{
                    expand: false,
                    src:    'build/js-container.js',
                    dest:   'build/js-container.min.js'
                }]
            }
        },
        jasmine: {
            src: 'build/js-container.js',
            options: {
                specs:    'tests/*Spec.js',
                template: require('grunt-template-jasmine-nml'),

            }
        }

    };

    grunt.initConfig(_config);

    // load the tasks
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // define the tasks
    grunt.registerTask('test', 'Run js-container tests.', [
        'jasmine'
    ]);
    // define the tasks
    grunt.registerTask('build', 'Build js-container.', [
        'clean:build',
        'concat:build',
        'uglify:build'
    ]);
};