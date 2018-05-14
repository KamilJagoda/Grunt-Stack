module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        php: {
            dist: {
                options: {
                    hostname: 'localhost',
                    port: 3000,
                    base: 'src',
                    keepalive: false,
                    open: false
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['*.jpg', '*.png', '*.svg', '*.gif'],
                    dest: 'build/images/'
                }]
            }
        },

        sass: {
            dist: {
                files: {
                    'build/styles/style.css' : 'src/styles/style.scss'
                }
            }
        },

        concat: {
            dist: {
                src: 'src/scripts/*.js',
                dest: 'build/scripts/app.js'
            }

        },

        uglify: {
            options: {
                mange: false
            },
            my_target: {
                files: [{

                    expand: true,
                    cwd: 'build/scripts/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'build/scripts/min/',
                    ext: '.min.js'
                },
                    {
                        expand: true,
                        cwd: 'src/scripts/vendors/',
                        src: '*.js',
                        dest: 'build/scripts/min/',
                        ext: '.min.js'
                    }
                ]
            }
        },

        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'build/styles/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/styles/min/',
                    ext: '.min.css'
                },
                    {
                        expand: true,
                        cwd: 'src/styles/vendors/',
                        src: '*.css',
                        dest: 'build/styles/min/',
                        ext: '.min.css'
                    }
                ]
            }
        },

        watch: {
            options: {
                spawn: false
            },
            sass: {
                files: ['src/styles/*.scss', 'src/styles/*/*.scss', 'build/styles/*.css'],
                tasks: ['sass', 'cssmin']
            },
            concat: {
                files: ['src/scripts/*.js'],
                tasks: ['concat', 'uglify']
            },

            uglify: {
                files: ['build/scripts/*.js', 'src/scripts/vendors/*.js'],
                tasks: 'uglify'
            }
        }

    });

    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['imagemin', 'sass', 'concat', 'uglify', 'cssmin','watch']);
    grunt.registerTask('serve', ['php:dist', 'default']);

};