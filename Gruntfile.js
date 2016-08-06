'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35733, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      css: {
        files: [
          'public/css/*.css'
        ],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: [
          'app/views/*.jade',
          'app/views/**/*.jade'
        ],
        options: { livereload: reloadPort }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          '../SmrtDistribution/public/libaries/minifiedScripts/angular-min.js': ['public/js/lib/jquery-2.1.4.min.js','public/js/lib/angular.min.js','public/js/lib/angular-ui-router.js','public/js/app.js'],
          '../SmrtDistribution/public/application/minifiedScripts/controllers/appController.js':['public/js/controllers/mainControllers.js','public/js/controllers/loginCtrl.js','public/js/controllers/appController.js','public/js/controllers/analyticsController.js','public/js/controllers/loadingOccupancyInfoCtrl.js','public/js/controllers/demographicDetailsCtrl.js','public/js/controllers/busLotCtrl.js','public/js/controllers/sliderInit.js','public/js/controllers/settingsCtrl.js','public/js/controllers/busEntryExitCtrl.js','public/js/controllers/busExitEntryDetailsForUser.js','public/js/controllers/configController.js','public/js/controllers/notificationController.js','public/js/controllers/mapController.js','public/js/controllers/userController.js','public/js/controllers/dataDownloadCtrl.js','public/js/controllers/unLoadingController.js'],
          '../SmrtDistribution/public/application/minifiedScripts/servcies/servcies.js':['public/js/servcies/loadingOccupancyInfo.js','public/js/servcies/AuthenticationService.js','public/js/servcies/demographicDetailsService.js','public/js/servcies/settingService.js','public/js/servcies/busEntryExitService.js','public/js/servcies/configService.js','public/js/servcies/notificationService.js','public/js/servcies/userService.js','public/js/servcies/mapService.js','public/js/servcies/unloadingBayService.js','public/js/servcies/busLotService.js'],
          '../SmrtDistribution/public/directives/minifiedScripts/directives.js':['public/directives/js/dateSlider.js','public/directives/js/barGraph.js','public/directives/js/solidGauge.js','public/directives/js/areaGraph.js'],
          '../SmrtDistribution/public/libaries/minifiedScripts/jquery/jquery.js':['public/js/lib/jquery-ui.min.js','public/js/lib/moment.js','public/js/lib/highcharts.js','public/js/lib/highcharts-more.js','public/js/lib/highcharts-solid-gauge.js','public/js/lib/slick.js','public/js/lib/angular-slick.js']
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          '../SmrtDistribution/public/application/cssMinified/css/app-min.css': ['public/css/uiStyle.css','public/css/lib/jquery-ui.min.css','public/css/lib/animate.css','public/css/lib/slick.css','public/css/lib/slick-theme.css']
        }
      }
    },
    processhtml: {
      build: {
        files: {
          '../SmrtDistribution/public/index.html': ['public/index.html']
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['**'], dest: '../SmrtDistribution/app/'},
          {expand: true, cwd: 'config/', src: ['**'], dest: '../SmrtDistribution/config/'},
          {expand: true, cwd: 'public/', src: ['**','!**/css/lib**','**/css/preStyles.css**','!**/css/uiStyle.css**','**/css/fonts.css**','**/directives/**','**/fonts/**','**/Graphics/**','**/images/**','!**/js/controllers**','**/js/lib**','!**/js/servcies**','**/js/script.js**','**/templates/**','**/Unsecure/**','!index.html'], dest: '../SmrtDistribution/public/'},
          { src: "package.json", dest: '../SmrtDistribution/'},
          { src:"app.js", dest: '../SmrtDistribution/'}

        ]
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);
  grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'develop',
    'watch'
  ]);
  grunt.registerTask('production', ['uglify','cssmin','copy','processhtml']);
};
