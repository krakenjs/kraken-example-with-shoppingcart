'use strict';


module.exports = function less(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-contrib-less');

	// Options
	return {
	    build: {
	        options: {
	            yuicompress: true,
	            paths: [ 'public/css' ]
	        },
	        files: {
	            '.build/css/app.css': 'public/css/app.less'
	        }
	    }
	};
};
