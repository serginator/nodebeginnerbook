'use strict';

/**
 * @param {Object} grunt
 */
module.exports = function (grunt) {

    var SRC_DIR = 'src/',
        REPORTS_DIR = 'reports/';

    // This will load all packages instead of loading here one by one
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                jshintignore: '.jshintignore',
                reporter: require('jshint-stylish')
            },
            src: {
                options: {
                    globals: {
                        module: true,
                        setTimeout: true,
                        localStorage: true
                    }
                },
                files: {
                    src: [SRC_DIR + '**/*.js']
                }
            },
            gruntfile: {
                files: {
                    src: 'Gruntfile.js'
                }
            }
        },
        gjslint: {
            options: {
                flags: [
                    '--disable 220' //ignore error code 220 from gjslint
                    ],
                reporter: {
                    name: 'console'
                },
                force: true
            },
            src: {
                src: [SRC_DIR + '**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: [SRC_DIR + '**/*.js'],
                tasks: ['jshint:src', 'gjslint:src']
            }
        },
        plato: {
            options: {
                jshint: grunt.file.readJSON('.jshintrc'),
                exclude: (function () {
                    var ignore = grunt.file.read('.jshintignore'),
                        files = ignore.split('\n'),
                        regex = '',
                        file;

                    for (var i = 0, len = files.length; i < len; i++) {
                        file = files[i];
                        file = file.replace('/', '\\/').replace('.', '\\.').replace('*', '\\*');
                        regex += file + '|';
                    }

                    regex = regex.substr(0, regex.length - 2);
                    return new RegExp(regex);
                })()
            },
            src: {
                files: {
                    'reports/plato': [SRC_DIR + '**/*.js']
                }
            }
        },
        clean: {
            reports: [REPORTS_DIR]
        },
        complexity: {
            src: {
                src: [SRC_DIR + '**/*.js'],
                options: {
                    errorsOnly: true, // show only maintainability errors
                    cyclomatic: 10,
                    halstead: 100,
                    maintainability: 100
                }
            }
        }
    });

    grunt.registerTask('default', [
        'jshint:src', 'gjslint:src'
        ]);

};
