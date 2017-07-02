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

        copy: {
            build: {
                src:     'source/container.js',
                dest:    'js-container.js',
                options: {
                    process: function (content, srcpath) {
                        return _banner + content;
                    },
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
                    src:    'source/container.js',
                    dest:   'js-container.min.js'
                }]
            }
        },

    };

    grunt.initConfig(_config);

    // load the tasks
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // define the tasks
    grunt.registerTask('build', 'Build js-container.', [
        'clean:build',
        'copy:build',
        'uglify:build'
    ]);
};