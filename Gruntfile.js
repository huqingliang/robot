module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: "/**<%= pkg.name %> <%= pkg.version %> by alibaba dw author <%= pkg.author %>*/"
      },
      build: {
      	src: ['js/*.js','js/library/widget/robot/*.js'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    concat: {
      options: {
        banner: '/**<%= banner %><%= jqueryCheck %>*/',
        stripBanners: false
      },
      robotLocal: {
//        src: ['js/*.js','js/library/widget/robot/*.js'],
        src: ['js/robot.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      robotRemote: {
	    	src: ['js/robot.js'],
	    	dest: 'E:/open-project/style-advisor/app/dw/js/library/widget/robot/<%= pkg.name %>.js'
    	},
    	robotEventRemote:{
	    	src: ['js/library/widget/robot/robot-event.js'],
	    	dest: 'E:/open-project/style-advisor/app/dw/js/library/widget/robot/robot-event.js'
    	},
    	robotTabRemote:{
	    	src : ['js/library/widget/robot/robot-tab.js'],
	    	dest: 'E:/open-project/style-advisor/app/dw/js/library/widget/robot/robot-tab.js'
    	},
    	robotDropDownRemote:{
	    	src : ['js/library/widget/robot/robot-dropdown.js'],
	    	dest: 'E:/open-project/style-advisor/app/dw/js/library/widget/robot/robot-dropdown.js'
    	},
    	robotDialogRemote:{
	    	src : ['js/library/widget/robot/robot-dialog.js'],
	    	dest: 'E:/open-project/style-advisor/app/dw/js/library/widget/robot/robot-dialog.js'
    	},
    	robotCommonRemote:{
	    	src : ['js/library/widget/robot/robot-common.js'],
	    	dest: 'E:/open-project/style-advisor/app/dw/js/library/widget/robot/robot-common.js'
    	},
    	robotDateRemote:{
	    	src : ['js/library/widget/robot/robot-calendar.js'],
	    	dest: 'E:/open-project/style-advisor/app/dw/js/library/widget/robot/robot-calendar.js'
    	},
    	robotPrettyRemote:{
	    	src : ['js/library/widget/robot/robot-pretty.js'],
	    	dest: 'E:/open-project/style-advisor/app/dw/js/library/widget/robot/robot-pretty.js'
    	},
    	robotNavsRemote:{
	    	src : ['js/library/widget/robot/robot-navs.js'],
	    	dest: 'E:/open-project/style-advisor/app/dw/js/library/widget/robot/robot-navs.js'
    	},
    	robotPageRemote:{
	    	src : ['js/library/widget/robot/robot-page.js'],
	    	dest: 'E:/open-project/style-advisor/app/dw/js/library/widget/robot/robot-page.js'
    	},
    	robotTooltipRemote:{
	    	src : ['js/library/widget/robot/robot-tooltip.js'],
	    	dest: 'E:/open-project/style-advisor/app/dw/js/library/widget/robot/robot-tooltip.js'
    	} 
    },
    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['js/*/*.js']
      }
    },
    watch: {
      src: {
        files: 'js/library/widget/robot/robot-*.js',
        tasks: ['concat']
      },
	    recess: {
	      files: 'less/widget/*.less',
	      tasks: ['recess']
	    }
    },
    recess: {
      options: {
        compile: true,
        banner: "<%= pkg.name %> <%= pkg.version %> by alibaba dw author <%= pkg.author %>"
      },
      robotLocal: {
        src: ['less/robot.less'],
        options: {
          compress: false,
          banner: "<%= pkg.name %> <%= pkg.version %> by alibaba dw author <%= pkg.author %>"
        },
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      robotRemote: {
        src: ['less/robot.less'],
        options: {
          compress: false,
          banner: "<%= pkg.name %> <%= pkg.version %> by alibaba dw author <%= pkg.author %>"
        },
        dest: 'E:/open-project/style-advisor/app/dw/css/library/widget/robot/<%= pkg.name %>.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-concat');

//  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-fonts', 'dist-js']);
  grunt.registerTask('default', ['recess','concat','watch']);//,'jshint' ,'watch' 
  grunt.registerTask('c', ['concat']);
  grunt.registerTask('w', 'watch');
  grunt.registerTask('test', 'jshint');
};