module.exports = function(grunt) {  "use strict";

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        reports: require('jshint-stylish')
      },
      all:[
        'Gruntfile.js',
        './src/xs-wizard-widget.js'
      ]
    }
  });
  grunt.registerTask('test', ['jshint']);

};
